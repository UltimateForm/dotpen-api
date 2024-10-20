import { InjectMapper } from "@automapper/nestjs";
import {
  CharacterRelationEntity,
  CharacterRelationFindInput,
  CharactersRepositoryService,
} from "@dotpen/charactersRepository";
import { Injectable } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { CharactersService } from "./characters.service";
import { Mapper } from "@automapper/core";
import { CharacterRelationsRequestModel } from "./models/request";
import {
  CharacterRelationModel,
  CharacterRelationsResponseModel,
} from "./models/response";

@Injectable()
export class RelationsService {
  static className = "RelationsService";
  constructor(
    private db: CharactersRepositoryService,
    @InjectMapper() private readonly automapper: Mapper,
    @InjectPinoLogger(CharactersService.className)
    private readonly logger: PinoLogger,
  ) {}

  async getRelations(
    requestModel: CharacterRelationsRequestModel,
  ): Promise<CharacterRelationsResponseModel> {
    const mappedInput = this.automapper.map(
      requestModel,
      CharacterRelationsRequestModel,
      CharacterRelationFindInput,
    );
    let dbResponse: CharacterRelationEntity[] = [];
    if (!requestModel.ids) {
      dbResponse = await this.db.readAllRelations(mappedInput);
    } else if (requestModel.ids.length === 1) {
      dbResponse = await this.db.readCharacterRelations(mappedInput);
    } else if (requestModel.ids.length === 2) {
      dbResponse = await this.db.readRelationBetweenCharacters(mappedInput);
    }
    const relationsList = this.automapper.mapArray(
      dbResponse,
      CharacterRelationEntity,
      CharacterRelationModel,
    );
    const responseModel = new CharacterRelationsResponseModel();
    responseModel.count = relationsList.length;
    responseModel.pageNo = requestModel.pageNo;
    responseModel.pageSize = requestModel.pageSize;
    responseModel.relations = relationsList;
    return responseModel;
  }
}
