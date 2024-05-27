import { ManagedTransaction, int } from "neo4j-driver";
import { CharacterRelationshipOperator } from "../../models/operators/operators";
import { GeneralCharacterRelationInput } from "../../models/data";
import { enforceRelationshipType } from "./common";

export function putRelation(relationship: GeneralCharacterRelationInput) {
  enforceRelationshipType(relationship.relation);
  return (tx: ManagedTransaction) => {
    return tx.run<CharacterRelationshipOperator>(
      `MATCH(characterX:Character {id:$idx})
      WITH characterX
      MATCH (characterY:Character {id:$idy})
      WITH characterX,characterY
      MERGE (characterX)-[relationship:${relationship.relation}]->(characterY)
      SET relationship += $relMap
      RETURN characterX,relationship,characterY`,
      {
        idx: relationship.idx,
        idy: relationship.idy,
        rel: relationship.relation,
        relMap: { level: int(relationship.level), spark: relationship.spark },
      },
    );
  };
}
