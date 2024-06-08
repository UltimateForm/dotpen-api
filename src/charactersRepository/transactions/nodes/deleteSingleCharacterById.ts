import { ManagedTransaction } from "neo4j-driver";

export function deleteSingleCharacterById(id: string) {
  return (tx: ManagedTransaction) => {
    return tx.run(
      `MATCH (character:Character {id: $id}) 
      DELETE character`,
      { id },
    );
  };
}
