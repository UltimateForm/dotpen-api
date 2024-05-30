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
      `MATCH relation=(characterX:Character {id: $idx})-[${relationPart}]-(characterY:Character {id: $idy})
			RETURN relation
			LIMIT 64`,
      {
        idx: relationInput.idx,
        idy: relationInput.idy,
        rel: relationInput.relation,
      },
    );
  };
}
