import { ManagedTransaction } from "neo4j-driver";
import { CharacterEntityOperator } from "../../models/operators";

export function readSingleCharacterById(id: string) {
  return (tx: ManagedTransaction) => {
    return tx.run<CharacterEntityOperator>(
      `MATCH (character:Character {id: $id}) 
      RETURN character
			LIMIT 1`,
      { id },
    );
  };
}
