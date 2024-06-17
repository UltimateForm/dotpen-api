import { Field, ObjectType } from "@nestjs/graphql";
import { CharModel } from "./char.model";
import { AutoMap } from "@automapper/classes";
import { RelationshipModel } from "./relationship.model";

@ObjectType()
export class CharRelationModel {
  @AutoMap(() => CharModel)
  @Field(() => CharModel)
  start: CharModel;
  @AutoMap(() => CharModel)
  @Field(() => CharModel)
  end: CharModel;
  @AutoMap(() => RelationshipModel)
  @Field(() => RelationshipModel)
  relation: RelationshipModel;
}
