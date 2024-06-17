import { AutoMap } from "@automapper/classes";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CharRelationModel } from "./char-relation.model";

@ObjectType()
export class CharModel {
  @Field()
  @AutoMap()
  id: string;
  @Field()
  @AutoMap()
  name: string;
  @Field()
  @AutoMap()
  description: string;
  @AutoMap()
  @Field(() => Int)
  debut: number;
  @Field(() => [CharRelationModel])
  relations: CharRelationModel[];
}
