import { AutoMap } from "@automapper/classes";
import { CharacterRelationType } from "./character-relation-type";

export class CharacterRelationFindInput {
  idx: string;
  idy: string;
  @AutoMap()
  relation: CharacterRelationType;
}
