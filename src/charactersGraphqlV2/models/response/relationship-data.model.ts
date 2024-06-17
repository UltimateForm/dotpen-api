import { Field, ObjectType } from "@nestjs/graphql";
import { AutoMap } from "@automapper/classes";
import { CharacterRelationLevel } from "@dotpen/charactersGraphql";

@ObjectType()
export class RelationshipDataModel {
  @AutoMap()
  @Field(() => String, { nullable: true })
  spark?: string;
  @AutoMap()
  @Field(() => CharacterRelationLevel)
  level: CharacterRelationLevel;
}
