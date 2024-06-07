import { deleteRelation } from "./deleteRelation";
import { putRelation } from "./putRelation";
import { readAllRelations } from "./readAllRelations";
import { readCharacterRelations } from "./readCharacterRelations";
import { readRelationBetweenCharacters } from "./readRelationBetweenCharacters";

export const rlx = {
  putRelation,
  deleteRelation,
  readRelationBetweenCharacters,
  readCharacterRelations,
  readAllRelations,
};
