import { ManagedTransaction } from "neo4j-driver";
import { CharacterEntity } from "../../models/data/nodes/character.entity";
import { CharacterEntityOperator } from "../../models/operators/operators";

export function updateSingleCharacterById(character: CharacterEntity) {
  return (tx: ManagedTransaction) => {
    return tx.run<CharacterEntityOperator>(
      `MATCH (character:Character {id: $id}) 
			SET character=$update
      RETURN character`,
      { id: character.id, update: character },
    );
  };
}
