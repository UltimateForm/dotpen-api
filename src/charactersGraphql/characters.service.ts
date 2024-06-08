import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import {
  CharacterEntity,
  CharacterRelationFindInput,
  CharacterRelationInput,
  CharacterRelationEntity,
  CharactersRepositoryService,
} from "@dotpen/charactersRepository";

import {
  CharacterCreateArgs,
  CharacterFindArgs,
  CharacterPutRelationArgs,
  CharacterRelationFindArgs,
  CharacterUpdateArgs,
  PaginationArgs,
} from "./models/args";
import {
  CharacterModel,
  CharacterOperationModel,
  CharacterRelationModel,
  CharacterRelationOperationModel,
  CharacterRelationsResponseModel,
  CharactersResponseModel,
} from "./models/response";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

@Injectable()
export class CharactersService {
  static className = "CharactersService";
  constructor(
    private db: CharactersRepositoryService,
    @InjectMapper() private readonly automapper: Mapper,
    @InjectPinoLogger(CharactersService.className)
    private readonly logger: PinoLogger,
  ) {}

  async createCharacter(characterArgs: CharacterCreateArgs) {
    const operationResult = new CharacterOperationModel();
    try {
      const characterEntity = this.automapper.map(
        characterArgs,
        CharacterCreateArgs,
        CharacterEntity,
      );
      const result = await this.db.createCharacter(characterEntity);
      const mappedCharacter = this.automapper.map(
        result,
        CharacterEntity,
        CharacterModel,
      );
      operationResult.character = mappedCharacter;
      operationResult.success = true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      operationResult.success = false;
    }
    return operationResult;
  }

  async getCharacterById(characterArgs: CharacterFindArgs) {
    const id = characterArgs.id;
    const result = await this.db.readCharacterById(id);
    const mapped = this.automapper.map(result, CharacterEntity, CharacterModel);
    return mapped;
  }

  async deleteCharacterById(characterFindArgs: CharacterFindArgs) {
    await this.db.deleteCharacterById(characterFindArgs.id);
    const result = new CharacterOperationModel();
    result.success = true;
    return result;
  }

  async updateCharacterById(
    characterUpdateArgs: CharacterUpdateArgs,
  ): Promise<CharacterOperationModel> {
    const operationResult = new CharacterOperationModel();
    try {
      const characterEntity = this.automapper.map(
        characterUpdateArgs,
        CharacterUpdateArgs,
        CharacterEntity,
      );
      const update = await this.db.updateCharacterById(characterEntity);
      const updatedModel = this.automapper.map(
        update,
        CharacterEntity,
        CharacterModel,
      );
      operationResult.success = true;
      operationResult.character = updatedModel;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      operationResult.success = false;
    }

    return operationResult;
  }

  async getCharacters(paginationArgs: PaginationArgs) {
    const limit = paginationArgs.pageSize;
    const skip = limit * paginationArgs.pageNo;
    const characters = await this.db.readCharacters({ limit, skip });
    const mappedCharacters = this.automapper.mapArray(
      characters,
      CharacterEntity,
      CharacterModel,
    );
    const response = new CharactersResponseModel();
    response.characters = mappedCharacters;
    response.count = mappedCharacters.length;
    response.pageNo = paginationArgs.pageNo;
    response.pageSize = paginationArgs.pageSize;
    return response;
  }

  async putCharacterRelation(
    relation: CharacterPutRelationArgs,
  ): Promise<CharacterRelationOperationModel> {
    const operationModel = new CharacterRelationOperationModel();
    try {
      const mappedInput = this.automapper.map(
        relation,
        CharacterPutRelationArgs,
        CharacterRelationInput,
      );
      const dbResp = await this.db.putRelation(mappedInput);
      const mappedResponse = this.automapper.map(
        dbResp,
        CharacterRelationEntity,
        CharacterRelationModel,
      );
      operationModel.success = true;
      operationModel.characterRelation = mappedResponse;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(error);
      operationModel.success = false;
    }
    return operationModel;
  }

  async deleteCharacterRelation(
    args: CharacterRelationFindArgs,
  ): Promise<CharacterRelationOperationModel> {
    const operationModel = new CharacterRelationOperationModel();
    try {
      const mappedInput = this.automapper.map(
        args,
        CharacterRelationFindArgs,
        CharacterRelationFindInput,
      );
      await this.db.deleteRelation(mappedInput);
      operationModel.success = true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(error);
      operationModel.success = false;
    }
    return operationModel;
  }

  async getRelations(
    args: CharacterRelationFindArgs,
  ): Promise<CharacterRelationsResponseModel> {
    const mappedInput = this.automapper.map(
      args,
      CharacterRelationFindArgs,
      CharacterRelationFindInput,
    );
    let dbResponse: CharacterRelationEntity[] = [];
    if (!args.ids) {
      dbResponse = await this.db.readAllRelations(mappedInput);
    } else if (args.ids.length === 1) {
      dbResponse = await this.db.readCharacterRelations(mappedInput);
    } else if (args.ids.length === 2) {
      dbResponse = await this.db.readRelationBetweenCharacters(mappedInput);
    } else {
      throw new BadRequestException("Ids max length is 2");
    }
    const relationsList = this.automapper.mapArray(
      dbResponse,
      CharacterRelationEntity,
      CharacterRelationModel,
    );
    const responseModel = new CharacterRelationsResponseModel();
    responseModel.count = relationsList.length;
    responseModel.pageNo = args.pageNo;
    responseModel.pageSize = args.pageSize;
    responseModel.relations = relationsList;
    return responseModel;
  }
}
