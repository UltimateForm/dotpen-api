import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import {
  CharacterEntity,
  CharacterRelationEntity,
  GeneralCharacterRelationOutput,
} from "src/neo4j";
import {
  CharacterModel,
  CharacterRelationAggregateModel,
  CharacterRelationModel,
} from "../models/response";

@Injectable()
export class ResponseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CharacterEntity, CharacterModel);
      createMap(mapper, CharacterRelationEntity, CharacterRelationModel);
      createMap(
        mapper,
        GeneralCharacterRelationOutput,
        CharacterRelationAggregateModel,
        forMember(
          (target) => target.characters,
          mapFrom((source) => [source.characterX, source.characterY]),
        ),
      );
    };
  }
}
