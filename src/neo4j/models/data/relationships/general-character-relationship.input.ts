import { AutoMap } from "@automapper/classes";
import { CharacterRelationType } from "./character-relationship-type";

export class GeneralCharacterRelationshipInput {
  @AutoMap()
  idx: string;
  @AutoMap()
  idy: string;
  @AutoMap()
  relation: CharacterRelationType;
  @AutoMap()
  spark?: string;
  @AutoMap()
  level: number;
}
