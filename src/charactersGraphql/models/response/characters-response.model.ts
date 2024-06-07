import { Field, ObjectType } from "@nestjs/graphql";
import { PaginationModel } from "./pagination.model";
import { CharacterModel } from "./character.model";

@ObjectType()
export class CharactersResponseModel extends PaginationModel {
  @Field(() => [CharacterModel])
  characters: CharacterModel[];
}
