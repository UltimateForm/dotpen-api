import { AutoMap } from "@automapper/classes";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CharacterModel {
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
}
