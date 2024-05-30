import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from "@nestjs/common";
import { Driver, Session } from "neo4j-driver";
import {
  CharacterEntity,
  RelationEntity,
  CharacterRelationFindInput,
  CharacterRelationInput,
  CharacterRelationEntity,
  CharacterRelationType,
  Pagination,
  RelationDataEntity,
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

  async putRelation(
    relationshipData: CharacterRelationInput,
  ): Promise<CharacterRelationEntity> {
    return this.#withSession(async (session) => {
      const write = await session.executeWrite(
        rlx.putRelation(relationshipData),
      );
      throw new NotImplementedException();
      // const record = write.records[0];
      // const characterX = record.get("characterX").properties;
      // const characterY = record.get("characterY").properties;
      // const relationship = record.get("relationship").properties;
      // const output: CharacterRelationEntity = {
      //   characterX,
      //   characterY,
      //   relation: [
      //     {
      //       type: relationshipData.relation,
      //       data: relationship,
      //     },
      //   ],
      // };
      // return output;
    });
  }

  async deleteRelation(
    relationFindInput: CharacterRelationFindInput,
  ): Promise<void> {
    return this.#withSession(async (session) => {
      const write = await session.executeWrite(
        rlx.deleteRelation(relationFindInput),
      );
      if (!write.summary.counters.containsUpdates()) {
        throw new NotFoundException();
      }
    });
  }

  async readRelationBetweenCharacters(
    input: CharacterRelationFindInput,
  ): Promise<CharacterRelationEntity> {
    return this.#withSession(async (session) => {
      const read = await session.executeRead(
        rlx.readRelationBetweenCharacters(input),
      );
      if (!read.records.length) {
        throw new NotFoundException();
      }
      const segments = read.records
        .flatMap((rec) => rec.get("relation")?.segments)
        .filter(Boolean);
      const firstSegment = segments[0];
      const entity = new CharacterRelationEntity();
      entity.start = firstSegment.start.properties as CharacterEntity;
      entity.end = firstSegment.end.properties as CharacterEntity;
      entity.relations = segments.map((seg) => {
        const relation = new RelationEntity();
        relation.type = seg.relationship.type as CharacterRelationType;
        relation.data = seg.relationship.properties as RelationDataEntity;
        return relation;
      });
      return entity;
      // const characterX = record.get("characterX").properties;
      // const characterY = record.get("characterY")?.properties;
      // const relationships = read.records
      //   .map((rel) => rel.get("relationship"))
      //   .filter(Boolean);
      // const output = new CharacterRelationEntity();
      // output.relation = relationships.map((rel) => {
      //   const relData = new RelationEntity();
      //   relData.type = rel.type as CharacterRelationType;
      //   relData.data = rel.properties;
      //   return relData;
      // });
      // output.characterX = characterX;
      // output.characterY = characterY;
      // return output;
    });
  }
}
