import { ArgsType, Field } from "@nestjs/graphql";
import { AutoMap } from "@automapper/classes";
import {
  CharacterRelationLevel,
  CharacterRelationType,
} from "@dotpen/common/models";

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
