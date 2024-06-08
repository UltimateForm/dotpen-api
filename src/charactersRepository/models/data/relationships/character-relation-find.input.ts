import { AutoMap } from "@automapper/classes";
import { CharacterRelationType } from "./character-relation-type";
import { PaginationInput } from "../pagination.input";

export class CharacterRelationFindInput extends PaginationInput {
  idx?: string;
  idy?: string;
  @AutoMap()
  relation: CharacterRelationType;
}
