import { ManagedTransaction } from "neo4j-driver";
import { enforceRelationshipType } from "./common";
import { CharacterRelationFindInput } from "../../models/data";
import { CharacterRelationshipOperator } from "../../models/operators";

export function readRelationBetweenCharacters(
  relationInput: CharacterRelationFindInput,
) {
  if (relationInput.relation) enforceRelationshipType(relationInput.relation);
  const relationPart = relationInput.relation
    ? `:${relationInput.relation}`
    : "";
  return (tx: ManagedTransaction) => {
    return tx.run<CharacterRelationshipOperator>(
      `MATCH (characterX:Character {id: $idx})
			WITH characterX
			OPTIONAL MATCH (characterY:Character {id: $idy})
			WITH characterX,characterY
			OPTIONAL MATCH (characterX)-[relationship${relationPart}]-(characterY)
			RETURN characterX,relationship,characterY
			LIMIT 64`,
      {
        idx: relationInput.idx,
        idy: relationInput.idy,
        rel: relationInput.relation,
      },
    );
  };
}
