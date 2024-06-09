import { ConfigService } from "@nestjs/config";
import { Driver, Session } from "neo4j-driver";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { ndx } from "./transactions";
import { UserEntity } from "./models/data";

export class AuthRepositoryService {
  static className = "AuthRepository";
  constructor(
    private driver: Driver,
    private config: ConfigService,
    @InjectPinoLogger(AuthRepositoryService.className)
    private readonly logger: PinoLogger,
  ) {}

  async #withSession<T>(func: (session: Session) => Promise<T>): Promise<T> {
    const session = this.driver.session({
      database: this.config.get("NEO4J_DATABASE"),
    });
    try {
      return await func(session);
    } finally {
      await session.close();
    }
  }

  async userExistsAtomically(user: UserEntity): Promise<boolean> {
    return this.#withSession(async (session) => {
      const read = await session.executeRead(
        ndx.computeUserExistsAtomically(user),
      );
      const exists = read.records?.[0]?.get("exists") ?? false;
      return exists;
    });
  }
}
