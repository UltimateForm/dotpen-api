import { Field, ObjectType } from "@nestjs/graphql";
import { AutoMap } from "@automapper/classes";
import { CharacterRelationType } from "@dotpen/charactersGraphql/models";
import { RelationshipDataModel } from "./relationship-data.model";

@ObjectType()
export class RelationshipModel {
  @AutoMap()
  @Field(() => CharacterRelationType)
  type: CharacterRelationType;
  @AutoMap()
  @Field(() => RelationshipDataModel)
  data: RelationshipDataModel;
}
