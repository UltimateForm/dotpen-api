import { Field, ObjectType } from "@nestjs/graphql";
import { CharacterModel } from "./character.model";
import { CharacterRelationType } from "../character-relation-type";
import { AutoMap } from "@automapper/classes";
import { CharacterRelationModel } from "./character-relation.model";

@ObjectType()
export class CharacterRelationAggregateModel {
  @AutoMap()
  @Field(() => [CharacterModel])
  characters: [CharacterModel, CharacterModel];
  @AutoMap()
  @Field(() => CharacterRelationType)
  relationType: CharacterRelationType;
  @AutoMap()
  @Field(() => CharacterRelationModel)
  relation: CharacterRelationModel;
}
