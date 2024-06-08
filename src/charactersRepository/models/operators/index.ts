import { Integer, Node, Path } from "neo4j-driver";
import { CharacterEntity, CharacterEntityIdentity } from "../data";

export type TCharacterNode = Node<Integer, CharacterEntity>;
export interface CharacterEntityOperator {
  character: TCharacterNode;
}

export type TRelationship = Path<CharacterEntityIdentity>;
export interface CharacterRelationshipOperator {
  relation: TRelationship;
  endNode: TCharacterNode;
  startNode: TCharacterNode;
}

export interface RelationshipOperator {
  relationship: TRelationship;
}
