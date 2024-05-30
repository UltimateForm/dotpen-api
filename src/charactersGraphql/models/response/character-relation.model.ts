import { Field, ObjectType } from "@nestjs/graphql";
import { CharacterModel } from "./character.model";
import { AutoMap } from "@automapper/classes";
import { RelationModel } from "./relation.model";

@ObjectType()
export class CharacterRelationModel {
  @AutoMap(() => CharacterModel)
  @Field(() => CharacterModel)
  start: CharacterModel;
  @AutoMap(() => CharacterModel)
  @Field(() => CharacterModel)
  end: CharacterModel;
  @AutoMap(() => [RelationModel])
  @Field(() => [RelationModel])
  relations: RelationModel[];
}
