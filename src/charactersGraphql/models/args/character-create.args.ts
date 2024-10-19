import { AutoMap } from "@automapper/classes";
import { ICharacter } from "@dotpen/interfaces";
import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CharacterCreateArgs implements ICharacter {
  @Field(() => String)
  @AutoMap()
  name: string;
  @Field(() => String)
  @AutoMap()
  description: string;
  @Field(() => Int)
  @AutoMap()
  debut: number;
}
