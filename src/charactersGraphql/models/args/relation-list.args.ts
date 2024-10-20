import { ArgsType } from "@nestjs/graphql";
import { PaginationArgs } from "./pagination.args";
import { CharacterRelationType } from "@dotpen/common/models";

@ArgsType()
export class RelationListArgs extends PaginationArgs {
  relationType: CharacterRelationType;
}
