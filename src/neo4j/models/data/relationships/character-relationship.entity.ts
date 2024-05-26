import { AutoMap } from "@automapper/classes";

export class CharacterRelationEntity {
  @AutoMap()
  spark?: string;
  @AutoMap()
  level: number;
}
