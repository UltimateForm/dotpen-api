import { AutoMap } from "@automapper/classes";
import { ArgsType, Field } from "@nestjs/graphql";
import { CharacterRelationType } from "../character-relation-type";

@ArgsType()
export class CharacterRelationFindArgs {
  @AutoMap(() => [String])
  @Field(() => [String])
  ids: [string, string];
  @AutoMap()
  @Field(() => CharacterRelationType, { nullable: true })
  relation?: CharacterRelationType;
}
