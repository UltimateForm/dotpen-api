import { Injectable } from "@nestjs/common";
import { Driver, Session } from "neo4j-driver";
import {
  CharacterEntity,
  RelationEntity,
  CharacterRelationFindInput,
  CharacterRelationInput,
  CharacterRelationEntity,
  CharacterRelationType,
  PaginationInput,
  RelationDataEntity,
} from "./models/data";
import { ConfigService } from "@nestjs/config";
import { generate as generateId } from "short-uuid";
import { ndx } from "./transactions/nodes";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { rlx } from "./transactions/relationships";
import { NoMatchException } from "./exceptions";

@Injectable()
export class CharactersRepositoryService {
  static className = "CharactersRepositoryService";
  constructor(
    private driver: Driver,
    private config: ConfigService,
    @InjectPinoLogger(CharactersRepositoryService.className)
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

  async readCharacterById(id: CharacterEntity["id"]) {
    return this.#withSession(async (session) => {
      const read = await session.executeRead(ndx.readSingleCharacterById(id));
      if (!read.records.length) {
        throw new NoMatchException();
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
        throw new NoMatchException();
      }
    });
  }

  async updateCharacterById(character: CharacterEntity) {
    return this.#withSession(async (session) => {
      const write = await session.executeWrite(
        ndx.updateSingleCharacterById(character),
      );
      if (!write.summary.counters.containsUpdates()) {
        throw new NoMatchException();
      }

      const updated = write.records.map((rec) => rec.get("character"))[0];
      return updated.properties;
    });
  }

  async readCharacters(pagination: PaginationInput) {
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
      if (!write.records.length) {
        throw new NoMatchException();
      }
      const record = write.records[0];
      const entity = new CharacterRelationEntity();
      const relation = new RelationEntity();
      const relationSegment = record.get("relation").segments[0];
      const startNode = record.get("startNode");
      const endNode = record.get("endNode");
      relation.type = relationSegment.relationship
        .type as CharacterRelationType;
      relation.data = relationSegment.relationship
        .properties as RelationDataEntity;
      entity.relation = relation;
      entity.start = startNode.properties as CharacterEntity;
      entity.end = endNode.properties as CharacterEntity;
      return entity;
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
        throw new NoMatchException();
      }
    });
  }

  async readRelationBetweenCharacters(
    input: CharacterRelationFindInput,
  ): Promise<CharacterRelationEntity[]> {
    return this.#withSession(async (session) => {
      const read = await session.executeRead(
        rlx.readRelationBetweenCharacters(input),
      );
      return read.records.map((rec) => {
        const entity = new CharacterRelationEntity();
        const relation = new RelationEntity();
        const relationSegment = rec.get("relation").segments[0];
        const startNode = rec.get("startNode");
        const endNode = rec.get("endNode");
        relation.type = relationSegment.relationship
          .type as CharacterRelationType;
        relation.data = relationSegment.relationship
          .properties as RelationDataEntity;
        entity.relation = relation;
        entity.start = startNode.properties as CharacterEntity;
        entity.end = endNode.properties as CharacterEntity;
        return entity;
      });
    });
  }

  async readCharacterRelations(
    input: CharacterRelationFindInput,
  ): Promise<CharacterRelationEntity[]> {
    return this.#withSession(async (session) => {
      const read = await session.executeRead(rlx.readCharacterRelations(input));
      return read.records.map((rec) => {
        const entity = new CharacterRelationEntity();
        const relation = new RelationEntity();
        const relationSegment = rec.get("relation").segments[0];
        const startNode = rec.get("startNode");
        const endNode = rec.get("endNode");
        relation.type = relationSegment.relationship
          .type as CharacterRelationType;
        relation.data = relationSegment.relationship
          .properties as RelationDataEntity;
        entity.relation = relation;
        entity.start = startNode.properties as CharacterEntity;
        entity.end = endNode.properties as CharacterEntity;
        return entity;
      });
    });
  }

  async readAllRelations(
    input: CharacterRelationFindInput,
  ): Promise<CharacterRelationEntity[]> {
    return this.#withSession(async (session) => {
      const read = await session.executeRead(rlx.readAllRelations(input));
      return read.records.map((rec) => {
        const entity = new CharacterRelationEntity();
        const relation = new RelationEntity();
        const relationSegment = rec.get("relation").segments[0];
        const startNode = rec.get("startNode");
        const endNode = rec.get("endNode");
        relation.type = relationSegment.relationship
          .type as CharacterRelationType;
        relation.data = relationSegment.relationship
          .properties as RelationDataEntity;
        entity.relation = relation;
        entity.start = startNode.properties as CharacterEntity;
        entity.end = endNode.properties as CharacterEntity;
        return entity;
      });
    });
  }
}
