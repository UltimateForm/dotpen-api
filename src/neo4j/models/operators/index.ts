import { Integer, Node, Relationship } from "neo4j-driver";
import { CharacterEntity, RelationDataEntity } from "../data";

export type TCharacterNode = Node<Integer, CharacterEntity>;
export interface CharacterEntityOperator {
  character: TCharacterNode;
}

export type TRelationship = Relationship<Integer, RelationDataEntity>;
export interface CharacterRelationshipOperator {
  characterX: TCharacterNode;
  characterY: TCharacterNode;
  relationship: TRelationship;
}

export interface RelationshipOperator {
  relationship: TRelationship;
}
