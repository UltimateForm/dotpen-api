import { ManagedTransaction, int } from "neo4j-driver";
import { CharacterRelationshipOperator } from "../../models/operators";
import { CharacterRelationInput } from "../../models/data";
import { enforceRelationshipType } from "./common";

export function putRelation(relationship: CharacterRelationInput) {
  enforceRelationshipType(relationship.relation);
  return (tx: ManagedTransaction) => {
    return tx.run<CharacterRelationshipOperator>(
      `MATCH(characterX:Character {id:$idx})
      WITH characterX
      MATCH (characterY:Character {id:$idy})
      WITH characterX,characterY
      MERGE relation=(characterX)-[relationData:${relationship.relation}]->(characterY)
      SET relationData += $relMap
      RETURN relation`,
      {
        idx: relationship.idx,
        idy: relationship.idy,
        rel: relationship.relation,
        relMap: { level: int(relationship.level), spark: relationship.spark },
      },
    );
  };
}
