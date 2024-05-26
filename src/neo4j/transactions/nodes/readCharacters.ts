import { ManagedTransaction, int } from "neo4j-driver";
import { CharacterEntityOperator } from "../../models/operators/operators";
import { Pagination } from "../../models/data";

export function readCharacters(pagination: Pagination) {
  return (tx: ManagedTransaction) => {
    return tx.run<CharacterEntityOperator>(
      `MATCH (character:Character) 
      RETURN character
			ORDER BY character.id
			SKIP $skip
			LIMIT $limit`,
      { limit: int(pagination.limit), skip: int(pagination.skip) },
    );
  };
}
