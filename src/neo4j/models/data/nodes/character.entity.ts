import { AutoMap } from "@automapper/classes";

export class CharacterEntity {
  @AutoMap()
  id: string | null = null;
  @AutoMap()
  name: string;
  @AutoMap()
  description: string;
  @AutoMap()
  debut: number;
}
