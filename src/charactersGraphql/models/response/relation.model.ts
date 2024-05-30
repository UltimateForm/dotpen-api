import { Field, ObjectType } from "@nestjs/graphql";
import { AutoMap } from "@automapper/classes";
import { RelationDataModel } from "./relation-data.model";
import { CharacterRelationType } from "../character-relation-type";

@ObjectType()
export class RelationModel {
  @AutoMap()
  @Field(() => CharacterRelationType)
  type: CharacterRelationType;
  @AutoMap()
  @Field(() => RelationDataModel)
  data: RelationDataModel;
}
