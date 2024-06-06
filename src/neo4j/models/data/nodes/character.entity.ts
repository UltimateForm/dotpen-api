import { AutoMap } from "@automapper/classes";
import { Integer } from "neo4j-driver";

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

export class CharacterEntityIdentity
  extends Integer
  implements CharacterEntity
{
  id: string;
  name: string;
  description: string;
  debut: number;
}
