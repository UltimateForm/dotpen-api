import { IPaginationResult } from "@dotpen/common/interfaces";
import { CharacterRelationModel } from "./character-relation.model";

export class CharacterRelationsResponseModel implements IPaginationResult {
  count: number;
  pageNo: number;
  pageSize: number;
  relations: CharacterRelationModel[];
}
