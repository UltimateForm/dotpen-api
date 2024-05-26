import { AutoMap } from "@automapper/classes";
import { CharacterRelationType } from "./character-relationship-type";
import { CharacterEntity } from "../nodes";
import { CharacterRelationshipEntity } from "./character-relationship.entity";

export class GeneralCharacterRelationshipOutput {
  @AutoMap()
  characterX: CharacterEntity;
  @AutoMap()
  characterY: CharacterEntity;
  @AutoMap()
  relationshipType: CharacterRelationType;
  @AutoMap()
  relationship: CharacterRelationshipEntity;
}
