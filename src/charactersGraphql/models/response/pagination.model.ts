import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PaginationModel {
  @Field(() => Int)
  pageNo: number;
  @Field(() => Int)
  pageSize: number;
}
