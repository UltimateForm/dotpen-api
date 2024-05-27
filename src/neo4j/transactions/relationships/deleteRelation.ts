import { ManagedTransaction } from "neo4j-driver";
import { CharacterRelationshipOperator } from "../../models/operators/operators";
import { CharacterRelationFindInput } from "../../models/data";
import { enforceRelationshipType } from "./common";

export function deleteRelation(relationInput: CharacterRelationFindInput) {
  enforceRelationshipType(relationInput.relation);
  return (tx: ManagedTransaction) => {
    return tx.run<CharacterRelationshipOperator>(
      `MATCH (characterX:Character {id: $idx})-[relationship:${relationInput.relation}]-(characterY:Character {id: $idy})
			DELETE relationship
			RETURN characterX,relationship,characterY`,
      {
        idx: relationInput.idx,
        idy: relationInput.idy,
        rel: relationInput.relation,
      },
    );
  };
}
