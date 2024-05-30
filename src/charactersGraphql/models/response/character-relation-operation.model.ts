import { Field, ObjectType } from "@nestjs/graphql";
import { CharacterRelationModel } from "./character-relation.model";

@ObjectType()
export class CharacterRelationOperationModel {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => CharacterRelationModel, { nullable: true })
  characterRelation?: CharacterRelationModel;
}
