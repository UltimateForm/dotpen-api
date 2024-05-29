import { Field, ObjectType } from "@nestjs/graphql";
import { CharacterRelationLevel } from "../character-relation-level";
import { AutoMap } from "@automapper/classes";

@ObjectType()
export class CharacterRelationDataModel {
  @AutoMap()
  @Field(() => String, { nullable: true })
  spark?: string;
  @AutoMap()
  @Field(() => CharacterRelationLevel)
  level: CharacterRelationLevel;
}
