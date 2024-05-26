import { ArgsType, Field } from "@nestjs/graphql";
import { CharacterCreateArgs } from "./character-create.args";
import { AutoMap } from "@automapper/classes";

@ArgsType()
export class CharacterUpdateArgs extends CharacterCreateArgs {
  @Field(() => String)
  @AutoMap()
  id: string;
}
