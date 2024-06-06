import { AutoMap } from "@automapper/classes";
import { ArgsType, Field } from "@nestjs/graphql";
import { CharacterRelationType } from "../character-relation-type";
import { PaginationArgs } from "./pagination.args";

@ArgsType()
export class CharacterRelationFindArgs extends PaginationArgs {
  @AutoMap(() => [String])
  @Field(() => [String])
  ids: [string, string];
  @AutoMap()
  @Field(() => CharacterRelationType, { nullable: true })
  relation?: CharacterRelationType;
}
