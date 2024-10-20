import { AutoMap } from "@automapper/classes";
import { ICharacter } from "@dotpen/common/interfaces";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CharacterModel implements ICharacter {
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
