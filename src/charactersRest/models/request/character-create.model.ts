import { AutoMap } from "@automapper/classes";
import { ICharacter } from "@dotpen/interfaces";
import { IsNumber, IsPositive, IsString } from "class-validator";

export class CharacterCreateModel implements ICharacter {
  @AutoMap()
  @IsString()
  name: string;
  @AutoMap()
  @IsString()
  description: string;
  @IsPositive()
  @AutoMap()
  @IsNumber()
  debut: number;
}
