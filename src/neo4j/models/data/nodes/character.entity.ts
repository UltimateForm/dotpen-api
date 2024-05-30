import { AutoMap } from "@automapper/classes";
import { Integer } from "neo4j-driver";

export class CharacterEntity extends Integer {
  @AutoMap()
  id: string | null = null;
  @AutoMap()
  name: string;
  @AutoMap()
  description: string;
  @AutoMap()
  debut: number;
}
