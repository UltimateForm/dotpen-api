import { AutoMap } from "@automapper/classes";
import { CharacterEntity } from "../nodes";
import { RelationOutput } from "./relation.output";

export class CharacterRelationOutput {
  @AutoMap()
  characterX: CharacterEntity;
  @AutoMap()
  characterY?: CharacterEntity;
  @AutoMap(() => [RelationOutput])
  relation?: RelationOutput[];
}
