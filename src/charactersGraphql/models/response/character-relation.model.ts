import { Field, ObjectType } from "@nestjs/graphql";
import { AutoMap } from "@automapper/classes";
import { CharacterRelationDataModel } from "./character-relation-data.model";
import { CharacterRelationType } from "../character-relation-type";

@ObjectType()
export class CharacterRelationModel {
  @AutoMap()
  @Field(() => CharacterRelationType)
  type: CharacterRelationType;
  @AutoMap()
  @Field(() => CharacterRelationDataModel)
  data: CharacterRelationDataModel;
}
