import { Neo4jError } from "neo4j-driver";

export class NoMatchException extends Neo4jError {
  static code: string = "DotPenApi.Neo4j.NoMatch";
  static message: string = "No matching resources for operation";
  constructor() {
    super(NoMatchException.message, NoMatchException.code);
  }
}
