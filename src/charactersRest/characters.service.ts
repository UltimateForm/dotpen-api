import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import {
  CharacterEntity,
  CharactersRepositoryService,
} from "@dotpen/charactersRepository";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { CharacterModel, CharactersResponseModel } from "./models/response";
import { PaginationRequestModel } from "./models/request";
import { Injectable } from "@nestjs/common";
import { CharacterOperationModel } from "./models/response/character-operation.model";

@Injectable()
export class CharactersService {
  static className = "CharactersRestService";

  constructor(
    private db: CharactersRepositoryService,
    @InjectMapper() private readonly automapper: Mapper,
    @InjectPinoLogger(CharactersService.className)
    private readonly logger: PinoLogger,
  ) {}

  async getCharacters(paginationArgs: PaginationRequestModel) {
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

  async getCharacterById(id: string) {
    const result = await this.db.readCharacterById(id);
    const mapped = this.automapper.map(result, CharacterEntity, CharacterModel);
    return mapped;
  }

  async deleteCharacterById(id: string) {
    await this.db.deleteCharacterById(id);
    const result = new CharacterOperationModel();
    result.success = true;
    return result;
  }
}
