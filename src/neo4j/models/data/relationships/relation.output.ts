import { AutoMap } from "@automapper/classes";
import { CharacterRelationType } from "./character-relation-type";
import { RelationDataEntity } from "./character-relation-data.entity";

export class RelationOutput {
  @AutoMap()
  type: CharacterRelationType;
  @AutoMap()
  data: RelationDataEntity;
}
