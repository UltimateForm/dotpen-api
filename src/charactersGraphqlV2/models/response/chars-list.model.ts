import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CharModel } from "./char.model";

@ObjectType()
export class CharsListModel {
  @Field(() => Int, { defaultValue: 0 })
  pageNo: number;
  @Field(() => Int, { defaultValue: 0 })
  pageSize: number;
  @Field(() => Int, { defaultValue: 0 })
  count: number;
  @Field(() => [CharModel])
  chars: CharModel[];
}
