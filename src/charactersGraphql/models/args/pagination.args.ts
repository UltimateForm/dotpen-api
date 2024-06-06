import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0 })
  pageNo: number;
  @Field(() => Int, { defaultValue: 0 })
  pageSize: number;
}
