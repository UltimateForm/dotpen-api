import { AutoMap } from "@automapper/classes";
import { CharacterEntity } from "../nodes";
import { RelationEntity } from "./relation.entity";

export class CharacterRelationEntity {
  @AutoMap(() => CharacterEntity)
  start: CharacterEntity;
  @AutoMap(() => CharacterEntity)
  end?: CharacterEntity;
  @AutoMap(() => [RelationEntity])
  relations?: RelationEntity[];
}
