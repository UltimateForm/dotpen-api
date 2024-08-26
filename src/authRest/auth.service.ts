import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { AuthRepositoryService, UserEntity } from "@dotpen/authRepository";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { LoginRequestModel } from "./models/request";
import { LoginResponseModel } from "./models/response";
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

  async login(request: LoginRequestModel): Promise<LoginResponseModel> {
    const mappedRequest = this.automapper.map(
      request,
      LoginRequestModel,
      UserEntity,
    );
    const existsAtomically = await this.db.userExistsAtomically(mappedRequest);
    if (!existsAtomically) {
      throw new UnauthorizedException();
    }
    const response = new LoginResponseModel();
    const jwttPayload = {
      email: request.email,
    };
    const token = await this.jwtService.signAsync(jwttPayload);
    response.token = token;
    return response;
  }
}
