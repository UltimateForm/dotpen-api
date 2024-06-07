import { ManagedTransaction, int } from "neo4j-driver";
import { enforceRelationshipType } from "./common";
import { CharacterRelationFindInput } from "../../models/data";
import { CharacterRelationshipOperator } from "../../models/operators";

export function readCharacterRelations(
  relationInput: CharacterRelationFindInput,
) {
  if (relationInput.relation) enforceRelationshipType(relationInput.relation);
  const relationPart = relationInput.relation
    ? `:${relationInput.relation}`
    : "";
  return (tx: ManagedTransaction) => {
    return tx.run<CharacterRelationshipOperator>(
      `MATCH relation=(characterX:Character {id: $idx})-[rel${relationPart}]-(characterY:Character)
			RETURN relation, startNode(rel) as startNode, endNode(rel) as endNode
			SKIP $skip
			LIMIT $limit`,
      {
        idx: relationInput.idx,
        idy: relationInput.idy,
        rel: relationInput.relation,
        limit: int(relationInput.limit),
        skip: int(relationInput.skip),
      },
    );
  };
}
