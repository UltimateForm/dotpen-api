import { Field, ObjectType } from "@nestjs/graphql";
import { CharacterModel } from "./character.model";

@ObjectType()
export class CharacterOperationModel {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => CharacterModel, { nullable: true })
  character?: CharacterModel;
}
