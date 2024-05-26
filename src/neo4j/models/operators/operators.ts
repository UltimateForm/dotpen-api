import { Integer, Node, Relationship } from "neo4j-driver";
import {
  CharacterEntity,
  FriendshipEntity,
  CharacterRelationshipEntity,
} from "../data";

export type TCharacterNode = Node<Integer, CharacterEntity>;
export interface CharacterEntityOperator {
  character: TCharacterNode;
}

export type TFriendshipNode = Relationship<Integer, FriendshipEntity>;
export interface CharacterFriendshipOperator {
  character: TCharacterNode;
  relationship: TFriendshipNode;
}

export type TRelationship = Relationship<Integer, CharacterRelationshipEntity>;
export interface CharacterRelationshipOperator {
  characterX: TCharacterNode;
  characterY: TCharacterNode;
  relationship: TRelationship;
}
