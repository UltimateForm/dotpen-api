import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import {
  CharacterEntity,
  RelationEntity,
  RelationDataEntity,
  CharacterRelationEntity,
} from "@dotpen/charactersRepository";
import {
  CharModel,
  CharRelationModel,
  RelationshipDataModel,
  RelationshipModel,
} from "../models/response";

@Injectable()
export class ResponseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CharacterEntity, CharModel);
      createMap(mapper, RelationDataEntity, RelationshipDataModel);
      createMap(mapper, RelationEntity, RelationshipModel);

      createMap(
        mapper,
        CharacterRelationEntity,
        CharRelationModel,
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
