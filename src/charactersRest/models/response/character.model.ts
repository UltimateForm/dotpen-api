import { AutoMap } from "@automapper/classes";

export class CharacterModel {
  @AutoMap()
  id: string;
  @AutoMap()
  name: string;
  @AutoMap()
  description: string;
  @AutoMap()
  debut: number;
}
