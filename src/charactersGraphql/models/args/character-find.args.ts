import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class CharacterFindArgs {
  @Field()
  id: string;
}
