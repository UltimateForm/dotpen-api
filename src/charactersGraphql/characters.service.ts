import { Injectable } from "@nestjs/common";
import {
  CharacterEntity,
  GeneralCharacterRelationshipInput,
  GeneralCharacterRelationshipOutput,
  Neo4jService,
} from "../neo4j";
import {
  CharacterCreateArgs,
  CharacterFindArgs,
  CharacterPutRelationArgs,
  CharacterUpdateArgs,
  PaginationArgs,
} from "./models/args";
import {
  CharacterModel,
  CharacterOperationModel,
  CharacterRelationAggregateModel,
} from "./models/response";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

@Injectable()
export class CharactersService {
  static className = "CharactersService";
  constructor(
    private db: Neo4jService,
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
      console.error(error);
      operationResult.success = false;
    }
    return operationResult;
  }

  async getCharacterById(characterArgs: CharacterFindArgs) {
    const id = characterArgs.id;
    const result = await this.db.getCharacterById(id);
    const mapped = this.automapper.map(result, CharacterEntity, CharacterModel);
    return mapped;
  }

  async deleteCharacterById(characterFindArgs: CharacterFindArgs) {
    await this.db.deleteCharacterById(characterFindArgs.id);
    const result = new CharacterOperationModel();
    result.success = true;
    return result;
  }

  async updateCharacterById(characterUpdateArgs: CharacterUpdateArgs) {
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
    return mappedCharacters;
  }

  async putCharacterRelationship(
    relation: CharacterPutRelationArgs,
  ): Promise<CharacterRelationAggregateModel> {
    const mappedInput = this.automapper.map(
      relation,
      CharacterPutRelationArgs,
      GeneralCharacterRelationshipInput,
    );
    const dbResp = await this.db.putRelationship(mappedInput);
    const mappedResponse = this.automapper.map(
      dbResp,
      GeneralCharacterRelationshipOutput,
      CharacterRelationAggregateModel,
    );
    this.logger.assign({ mappedResponse });
    this.logger.info("response mapped");
    return mappedResponse;
  }
}
