import { ArgsType, Field } from "@nestjs/graphql";
import { CharacterRelationType } from "../character-relation-type";
import { AutoMap } from "@automapper/classes";
import { CharacterRelationLevel } from "../character-relation-level";

@ArgsType()
export class CharacterPutRelationArgs {
  @AutoMap(() => [String])
  @Field(() => [String])
  ids: [string, string];
  @AutoMap()
  @Field(() => CharacterRelationType)
  relation: CharacterRelationType;
  @AutoMap()
  @Field(() => String, { nullable: true })
  spark?: string;
  @AutoMap()
  @Field(() => CharacterRelationLevel)
  level: CharacterRelationLevel;
}
