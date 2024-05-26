import { Field, ObjectType } from "@nestjs/graphql";
import { CharacterRelationAggregateModel } from "./character-relation-aggregate.model";

@ObjectType()
export class CharacterRelationOperationModel {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => CharacterRelationAggregateModel, { nullable: true })
  characterRelation?: CharacterRelationAggregateModel;
}
