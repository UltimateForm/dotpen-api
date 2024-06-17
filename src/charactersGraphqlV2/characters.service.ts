import { Injectable } from "@nestjs/common";

import { CharModel, CharRelationModel } from "./models/response";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { CharsArgs } from "./models/args";
import {
  CharacterEntity,
  CharacterRelationEntity,
  CharactersRepositoryService,
} from "@dotpen/charactersRepository";

@Injectable()
export class CharactersService {
  static className = "CharactersService";
  constructor(
    private db: CharactersRepositoryService,
    @InjectMapper() private readonly automapper: Mapper,
    @InjectPinoLogger(CharactersService.className)
    private readonly logger: PinoLogger,
  ) {}

  async getCharacters(charsArgs: CharsArgs) {
    const limit = charsArgs.pageSize;
    const skip = limit * charsArgs.pageNo;
    const characters = await this.db.readCharacters({ limit, skip });
    const mappedCharacters = this.automapper.mapArray(
      characters,
      CharacterEntity,
      CharModel,
    );
    return mappedCharacters;
  }

  async getRelations(id: string): Promise<CharRelationModel[]> {
    const dbResponse = await this.db.readCharacterRelations({
      idx: id,
      skip: 0,
      limit: 0,
    });
    const relationsList = this.automapper.mapArray(
      dbResponse,
      CharacterRelationEntity,
      CharRelationModel,
    );
    return relationsList;
  }
}
