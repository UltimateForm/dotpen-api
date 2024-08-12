import { IPaginationResult } from "@dotpen/interfaces";
import { CharacterModel } from "./character.model";

export class CharactersResponseModel implements IPaginationResult {
  characters: CharacterModel[];
  pageNo: number;
  pageSize: number;
  count: number;
}
