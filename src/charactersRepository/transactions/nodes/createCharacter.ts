import { ManagedTransaction } from "neo4j-driver";
import { CharacterEntityOperator } from "../../models/operators";
import { CharacterEntity } from "../../models/data/nodes/character.entity";

export function createCharacter(character: CharacterEntity) {
  return (tx: ManagedTransaction) => {
    return tx.run<CharacterEntityOperator>(
      `CREATE (character:Character {id: $id, name: $name, description: $description, debut: $debut}) 
      RETURN character
      LIMIT 1`,
      character,
    );
  };
}
