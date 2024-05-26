import { AutoMap } from "@automapper/classes";
import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CharacterCreateArgs {
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
