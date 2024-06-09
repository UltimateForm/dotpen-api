import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthRepositoryModule } from "@dotpen/authRepository";
import { AuthService } from "./auth.service";
import { RequestProfile } from "./mapper";

@Module({
  imports: [AuthRepositoryModule],
  providers: [RequestProfile, AuthService],
  controllers: [AuthController],
})
export class AuthRestModule {}
