import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CharsArgs {
  @Field(() => Int, { defaultValue: 0 })
  pageNo: number;
  @Field(() => Int, { defaultValue: 10 })
  pageSize: number;
}
