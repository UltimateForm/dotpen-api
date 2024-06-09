import { AutoMap } from "@automapper/classes";

export class UserEntity {
  @AutoMap()
  email: string;
  @AutoMap()
  password: string;
}
