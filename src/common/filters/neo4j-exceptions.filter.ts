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
  catch(exception: Neo4jError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const mappedException = getHttpException(exception.code);
    response
      .status(mappedException.getStatus())
      .json(mappedException.getResponse());
  }
}
