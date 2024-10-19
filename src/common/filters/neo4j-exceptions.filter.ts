import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Neo4jError } from "neo4j-driver";
import { Response } from "express";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

export function getHttpException(neo4jErrorCode: string): HttpException {
  switch (neo4jErrorCode) {
    case "Neo.ClientError.Schema.ConstraintValidationFailed":
      return new BadRequestException(
        "Creation violates one or more constraints (i.e. uniqueness).",
      );
    case "DotPenApi.Neo4j.NoMatch":
      return new NotFoundException("No matching resources");
    default:
      return new InternalServerErrorException(
        "Unexpected error, please try again.",
      );
  }
}

@Catch(Neo4jError)
export class Neo4jExceptionFilter implements ExceptionFilter {
  static className = "Neo4jExceptionFilter";

  constructor(
    @InjectPinoLogger(Neo4jExceptionFilter.className)
    private readonly logger: PinoLogger,
  ) {}

  catch(exception: Neo4jError, host: ArgumentsHost) {
    this.logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const mappedException = getHttpException(exception.code);
    response
      .status(mappedException.getStatus())
      .json(mappedException.getResponse());
  }
}
