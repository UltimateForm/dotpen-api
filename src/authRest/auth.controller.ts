import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { LoginResponse } from "./models/response";
import { LoginRequest } from "./models/request";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  static className = "AuthController";
  constructor(
    private readonly service: AuthService,
    @InjectPinoLogger(AuthController.className)
    private readonly logger: PinoLogger,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return this.service.login(loginRequest);
  }
}
