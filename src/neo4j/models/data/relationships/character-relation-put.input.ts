import { AutoMap } from "@automapper/classes";
import { CharacterRelationType } from "./character-relation-type";

export class CharacterRelationPutInput {
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
