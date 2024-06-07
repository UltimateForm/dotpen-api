import { ManagedTransaction, int } from "neo4j-driver";
import { CharacterEntityOperator } from "../../models/operators";
import { PaginationInput } from "../../models/data";

export function readCharacters(pagination: PaginationInput) {
  return (tx: ManagedTransaction) => {
    return tx.run<CharacterEntityOperator>(
      `MATCH (character:Character) 
      RETURN character
			ORDER BY character.debut
			SKIP $skip
			LIMIT $limit`,
      { limit: int(pagination.limit), skip: int(pagination.skip) },
    );
  };
}
