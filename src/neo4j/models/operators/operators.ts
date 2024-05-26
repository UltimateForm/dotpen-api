import { Integer, Node, Relationship } from "neo4j-driver";
import { CharacterEntity, CharacterRelationEntity } from "../data";

export type TCharacterNode = Node<Integer, CharacterEntity>;
export interface CharacterEntityOperator {
  character: TCharacterNode;
}

export type TRelationship = Relationship<Integer, CharacterRelationEntity>;
export interface CharacterRelationshipOperator {
  characterX: TCharacterNode;
  characterY: TCharacterNode;
  relationship: TRelationship;
}
