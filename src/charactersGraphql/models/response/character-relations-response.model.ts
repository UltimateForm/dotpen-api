import { Field, ObjectType } from "@nestjs/graphql";
import { CharacterRelationModel } from "./character-relation.model";
import { PaginationModel } from "./pagination.model";

@ObjectType()
export class CharacterRelationsResponseModel extends PaginationModel {
  @Field(() => [CharacterRelationModel])
  relations: CharacterRelationModel[];
}
