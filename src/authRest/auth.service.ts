import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { AuthRepositoryService, UserEntity } from "@dotpen/authRepository";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { LoginRequest } from "./models/request";
import { LoginResponse } from "./models/response";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  static className = "AuthService";
  constructor(
    private db: AuthRepositoryService,
    @InjectMapper() private readonly automapper: Mapper,
    private jwtService: JwtService,
    @InjectPinoLogger(AuthService.className)
    private readonly logger: PinoLogger,
  ) {}

  async login(request: LoginRequest): Promise<LoginResponse> {
    const mappedRequest = this.automapper.map(
      request,
      LoginRequest,
      UserEntity,
    );
    const existsAtomically = await this.db.userExistsAtomically(mappedRequest);
    if (!existsAtomically) {
      throw new UnauthorizedException();
    }
    const response = new LoginResponse();
    const jwttPayload = {
      email: request.email,
    };
    const token = await this.jwtService.signAsync(jwttPayload);
    response.token = token;
    return response;
  }
}
