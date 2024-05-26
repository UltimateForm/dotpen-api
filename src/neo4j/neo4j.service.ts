import { Injectable, NotFoundException } from "@nestjs/common";
import { Driver, Session } from "neo4j-driver";
import {
  CharacterEntity,
  GeneralCharacterRelationshipInput,
  GeneralCharacterRelationshipOutput,
  Pagination,
} from "./models/data";
import { ConfigService } from "@nestjs/config";
import { generate as generateId } from "short-uuid";
import { ndx } from "./transactions/nodes";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { rlx } from "./transactions/relationships";

@Injectable()
export class Neo4jService {
  static className = "Neo4jService";
  constructor(
    private driver: Driver,
    private config: ConfigService,
    @InjectPinoLogger(Neo4jService.className)
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

  async createCharacter(character: Omit<CharacterEntity, "id">) {
    return this.#withSession(async (session) => {
      const generatedId = generateId().toString();
      const signedCharacter: CharacterEntity = {
        ...character,
        id: generatedId,
      };
      const write = await session.executeWrite(
        ndx.createCharacter(signedCharacter),
      );
      const created = write.records.map((rec) => rec.get("character"))[0];
      return created.properties;
    });
  }

  async getCharacterById(id: CharacterEntity["id"]) {
    return this.#withSession(async (session) => {
      const read = await session.executeRead(ndx.readSingleCharacterById(id));
      if (!read.records.length) {
        throw new NotFoundException();
      }
      const characterNodde = read.records.map((rec) => rec.get("character"))[0];
      return characterNodde.properties;
    });
  }

  async deleteCharacterById(id: CharacterEntity["id"]) {
    return this.#withSession(async (session) => {
      const write = await session.executeWrite(
        ndx.deleteSingleCharacterById(id),
      );
      if (!write.summary.counters.containsUpdates()) {
        throw new NotFoundException();
      }
    });
  }

  async updateCharacterById(character: CharacterEntity) {
    return this.#withSession(async (session) => {
      const write = await session.executeWrite(
        ndx.updateSingleCharacterById(character),
      );
      if (!write.summary.counters.containsUpdates()) {
        throw new NotFoundException();
      }

      const updated = write.records.map((rec) => rec.get("character"))[0];
      return updated.properties;
    });
  }

  async readCharacters(pagination: Pagination) {
    return this.#withSession(async (session) => {
      const read = await session.executeRead(ndx.readCharacters(pagination));
      const characters = read.records.map(
        (rec) => rec.get("character")?.properties,
      );
      return characters;
    });
  }

  async putRelationship(
    relationshipData: GeneralCharacterRelationshipInput,
  ): Promise<GeneralCharacterRelationshipOutput> {
    return this.#withSession(async (session) => {
      const write = await session.executeWrite(
        rlx.putRelationship(relationshipData),
      );
      const record = write.records[0];
      const characterX = record.get("characterX").properties;
      const characterY = record.get("characterY").properties;
      const relationship = record.get("relationship").properties;
      this.logger.assign({ relationship });
      this.logger.info("GOT RELATIONSHIP");
      const output: GeneralCharacterRelationshipOutput = {
        characterX,
        characterY,
        relationship,
        relationshipType: relationshipData.relation,
      };
      return output;
    });
  }
}
