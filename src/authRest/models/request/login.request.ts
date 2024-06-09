import { AutoMap } from "@automapper/classes";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginRequest {
  @AutoMap()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @AutoMap()
  password: string;
}
