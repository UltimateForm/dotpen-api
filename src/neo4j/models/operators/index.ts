import { Integer, Node, Path } from "neo4j-driver";
import { CharacterEntity } from "../data";

export type TCharacterNode = Node<Integer, CharacterEntity>;
export interface CharacterEntityOperator {
  character: TCharacterNode;
}

export type TRelationship = Path<CharacterEntity>;
export interface CharacterRelationshipOperator {
  relation: TRelationship;
}

export interface RelationshipOperator {
  relationship: TRelationship;
}
