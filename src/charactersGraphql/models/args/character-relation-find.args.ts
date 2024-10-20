import { AutoMap } from "@automapper/classes";
import { ArgsType, Field } from "@nestjs/graphql";
import { PaginationArgs } from "./pagination.args";
import { CharacterRelationType } from "@dotpen/common/models";

@ArgsType()
export class CharacterRelationFindArgs extends PaginationArgs {
  @AutoMap(() => [String])
  @Field(() => [String], { nullable: true })
  ids?: string[];
  @AutoMap()
  @Field(() => CharacterRelationType, { nullable: true })
  relation?: CharacterRelationType;
}
