import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CharacterRelationModel } from "./character-relation.model";

@ObjectType()
export class CharacterRelationsResponseModel {
  @Field(() => [CharacterRelationModel])
  relations: CharacterRelationModel[];
  @Field(() => Int)
  count: number;
}
