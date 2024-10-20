import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import {
  CharacterEntity,
  CharacterRelationEntity,
  RelationDataEntity,
  RelationEntity,
} from "@dotpen/charactersRepository";
import {
  CharacterModel,
  CharacterRelationModel,
  RelationDataModel,
  RelationModel,
} from "../models/response";

@Injectable()
export class ResponseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CharacterEntity, CharacterModel);
      createMap(mapper, RelationDataEntity, RelationDataModel);
      createMap(mapper, RelationEntity, RelationModel);
      createMap(
        mapper,
        CharacterRelationEntity,
        CharacterRelationModel,
        forMember(
          (target) => target.start,
          mapFrom((source) => source.start),
        ),
        forMember(
          (target) => target.end,
          mapFrom((source) => source.end),
        ),
      );
    };
  }
}
