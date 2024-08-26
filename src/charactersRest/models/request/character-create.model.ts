import { AutoMap } from "@automapper/classes";
import { IsNumber, IsPositive, IsString } from "class-validator";

export class CharacterCreateModel {
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
