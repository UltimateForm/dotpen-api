import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { getAuthorizationToken } from "../util/request";
import { ConfigService } from "@nestjs/config";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

export class AuthGuard implements CanActivate {
  static className = "AuthGuard";

  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectPinoLogger(AuthGuard.className)
    private readonly logger: PinoLogger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = getAuthorizationToken(request);
    if (!authToken) {
      throw new UnauthorizedException();
    }
    try {
      await this.jwtService.verifyAsync(authToken, {
        secret: this.config.get("JWT_TOKEN"),
      });
    } catch (error) {
      this.logger.debug(`Authorization failure: ${error}`);
      throw new UnauthorizedException();
    }
    return true;
  }
}
