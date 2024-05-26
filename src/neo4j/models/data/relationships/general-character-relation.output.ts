import { AutoMap } from "@automapper/classes";
import { CharacterRelationType } from "./character-relationship-type";
import { CharacterEntity } from "../nodes";
import { CharacterRelationEntity } from "./character-relationship.entity";

export class GeneralCharacterRelationOutput {
  @AutoMap()
  characterX: CharacterEntity;
  @AutoMap()
  characterY: CharacterEntity;
  @AutoMap()
  relationType: CharacterRelationType;
  @AutoMap()
  relation: CharacterRelationEntity;
}
