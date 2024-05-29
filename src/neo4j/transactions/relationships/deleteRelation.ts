import { ManagedTransaction } from "neo4j-driver";
import { CharacterRelationFindInput } from "../../models/data";
import { enforceRelationshipType } from "./common";

export function deleteRelation(relationInput: CharacterRelationFindInput) {
  enforceRelationshipType(relationInput.relation);
  return (tx: ManagedTransaction) => {
    return tx.run(
      `MATCH (characterX:Character {id: $idx})-[relationship:${relationInput.relation}]-(characterY:Character {id: $idy})
			DELETE relationship`,
      {
        idx: relationInput.idx,
        idy: relationInput.idy,
        rel: relationInput.relation,
      },
    );
  };
}
