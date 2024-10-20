import { Field, ObjectType } from "@nestjs/graphql";
import { AutoMap } from "@automapper/classes";
import { CharacterRelationLevel } from "@dotpen/common/models";

@ObjectType()
export class RelationDataModel {
  @AutoMap()
  @Field(() => String, { nullable: true })
  spark?: string;
  @AutoMap()
  @Field(() => CharacterRelationLevel)
  level: CharacterRelationLevel;
}
