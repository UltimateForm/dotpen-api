import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import {
  CharacterEntity,
  CharacterRelationFindInput,
  GeneralCharacterRelationInput,
} from "src/neo4j";
import {
  CharacterCreateArgs,
  CharacterPutRelationArgs,
  CharacterRelationFindArgs,
  CharacterUpdateArgs,
} from "../models/args";

@Injectable()
export class RequestProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CharacterCreateArgs, CharacterEntity);
      createMap(mapper, CharacterUpdateArgs, CharacterEntity);
      createMap(
        mapper,
        CharacterPutRelationArgs,
        GeneralCharacterRelationInput,
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
        CharacterRelationFindArgs,
        CharacterRelationFindInput,
        forMember(
          (target) => target.idx,
          mapFrom((source) => source.ids[0]),
        ),
        forMember(
          (target) => target.idy,
          mapFrom((source) => source.ids[1]),
        ),
      );
    };
  }
}
