import { CharacterRelationType } from "@dotpen/common/models";
import { RelationDataModel } from "./relation-data.model";
import { AutoMap } from "@automapper/classes";

export class RelationModel {
  @AutoMap()
  type: CharacterRelationType;
  @AutoMap()
  data: RelationDataModel;
}
