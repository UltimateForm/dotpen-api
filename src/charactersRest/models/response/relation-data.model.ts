import { AutoMap } from "@automapper/classes";
import { CharacterRelationLevel } from "@dotpen/common/models";

export class RelationDataModel {
  @AutoMap()
  spark?: string;
  @AutoMap()
  level: CharacterRelationLevel;
}
