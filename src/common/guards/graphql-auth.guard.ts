import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { getAuthorizationToken } from "../util/request";
import { ConfigService } from "@nestjs/config";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { GqlExecutionContext } from "@nestjs/graphql";

export class GraphqlAuthGuard implements CanActivate {
  static className = "GraphqlAuthGuard";

  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectPinoLogger(GraphqlAuthGuard.className)
    private readonly logger: PinoLogger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const properContext = GqlExecutionContext.create(context);
    const request = properContext.getContext().req;
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
