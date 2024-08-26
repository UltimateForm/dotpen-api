import { AutoMap } from "@automapper/classes";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginRequestModel {
  @AutoMap()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @AutoMap()
  password: string;
}
