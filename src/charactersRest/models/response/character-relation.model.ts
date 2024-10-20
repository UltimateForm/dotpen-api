import { AutoMap } from "@automapper/classes";
import { CharacterModel } from "./character.model";
import { RelationModel } from "./relation.model";

export class CharacterRelationModel {
  @AutoMap(() => CharacterModel)
  start: CharacterModel;
  @AutoMap(() => CharacterModel)
  end: CharacterModel;
  @AutoMap(() => RelationModel)
  relation: RelationModel;
}
