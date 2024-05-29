import { Field, ObjectType } from "@nestjs/graphql";
import { CharacterModel } from "./character.model";
import { AutoMap } from "@automapper/classes";
import { CharacterRelationModel } from "./character-relation.model";

@ObjectType()
export class CharacterRelationAggregateModel {
  @AutoMap()
  @Field(() => [CharacterModel])
  characters: [CharacterModel, CharacterModel];
  @AutoMap(() => [CharacterRelationModel])
  @Field(() => [CharacterRelationModel])
  relation: CharacterRelationModel[];
}
