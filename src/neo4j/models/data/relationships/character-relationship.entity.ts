import { AutoMap } from "@automapper/classes";

export class CharacterRelationshipEntity {
  @AutoMap()
  spark?: string;
  @AutoMap()
  level: number;
}
