import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import {
  CharacterEntity,
  CharacterRelationFindInput,
  CharacterRelationInput,
} from "@dotpen/charactersRepository";
import {
  CharacterCreateModel,
  CharacterRelationPutModel,
  CharacterRelationsRequestModel,
} from "../models/request";

@Injectable()
export class RequestProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CharacterCreateModel, CharacterEntity);
      createMap(
        mapper,
        CharacterRelationPutModel,
        CharacterRelationInput,
        forMember(
          (target) => target.idx,
          mapFrom((source) => source.ids[0]),
        ),
        forMember(
          (target) => target.idy,
          mapFrom((source) => source.ids[1]),
        ),
      );
      createMap(
        mapper,
        CharacterRelationsRequestModel,
        CharacterRelationFindInput,
        forMember(
          (target) => target.idx,
          mapFrom((source) => source.ids?.[0]),
        ),
        forMember(
          (target) => target.idy,
          mapFrom((source) => source.ids?.[1]),
        ),
        forMember(
          (target) => target.skip,
          mapFrom((source) => source.pageNo * source.pageSize),
        ),
        forMember(
          (target) => target.limit,
          mapFrom((source) => source.pageSize),
        ),
      );
    };
  }
}
