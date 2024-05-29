import { AutoMap } from "@automapper/classes";

export class RelationDataEntity {
  @AutoMap()
  spark?: string;
  @AutoMap()
  level: number;
}
