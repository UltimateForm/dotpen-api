import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { createMap, type Mapper } from "@automapper/core";
import { CharacterEntity } from "@dotpen/charactersRepository";
import { CharacterModel } from "../models/response";

@Injectable()
export class ResponseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CharacterEntity, CharacterModel);
    };
  }
}