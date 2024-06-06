import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PaginationModel {
  @Field(() => Int, { defaultValue: 0 })
  pageNo: number;
  @Field(() => Int, { defaultValue: 0 })
  pageSize: number;
}
