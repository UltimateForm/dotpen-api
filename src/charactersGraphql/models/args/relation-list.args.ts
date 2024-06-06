import { ArgsType } from "@nestjs/graphql";
import { PaginationArgs } from "./pagination.args";
import { CharacterRelationType } from "../character-relation-type";

@ArgsType()
export class RelationListArgs extends PaginationArgs {
  relationType: CharacterRelationType;
}
