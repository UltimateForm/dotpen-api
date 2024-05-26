import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  pageNo: number;
  @Field(() => Int)
  pageSize: number;
}
