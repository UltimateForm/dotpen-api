import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import {
  CharacterEntity,
  RelationOutput,
  RelationDataEntity,
  CharacterRelationOutput,
} from "src/neo4j";
import {
  CharacterModel,
  CharacterRelationAggregateModel,
  CharacterRelationModel,
} from "../models/response";
import { CharacterRelationDataModel } from "../models/response/character-relation-data.model";

@Injectable()
export class ResponseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CharacterEntity, CharacterModel);
      createMap(mapper, RelationDataEntity, CharacterRelationDataModel);
      createMap(mapper, RelationOutput, CharacterRelationModel);

      createMap(
        mapper,
        CharacterRelationOutput,
        CharacterRelationAggregateModel,
        forMember(
          (target) => target.characters,
          mapFrom((source) =>
            [source.characterX, source.characterY].filter(Boolean),
          ),
        ),
      );
    };
  }
}
