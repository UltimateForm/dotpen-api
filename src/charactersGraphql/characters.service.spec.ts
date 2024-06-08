import {
  CharacterEntity,
  CharacterRelationInput,
  Neo4jService,
  CharacterRelationEntity,
  CharacterRelationFindInput,
} from "@dotpen/neo4j";
import { CharactersService } from "./characters.service";
import { Mapper } from "@automapper/core";
import { PinoLogger } from "nestjs-pino";
import { MockProxy, mock } from "jest-mock-extended";
import {
  CharacterModel,
  CharacterRelationModel,
  CharacterRelationsResponseModel,
} from "./models/response";
import {
  CharacterFindArgs,
  CharacterPutRelationArgs,
  CharacterRelationFindArgs,
  CharacterUpdateArgs,
} from "./models/args";
import { NotFoundException } from "@nestjs/common";
import { TDeepPartial } from "@dotpen/testing/types";

describe("getCharacterById", () => {
  let service: CharactersService;
  let neo4jService: MockProxy<Neo4jService>;
  let logger: MockProxy<PinoLogger>;
  let mapper: MockProxy<Mapper>;
  beforeEach(async () => {
    neo4jService = mock<Neo4jService>();
    mapper = mock<Mapper>();
    logger = mock<PinoLogger>();
    service = new CharactersService(neo4jService, mapper, logger);
  });

  test("getCharacterById", async () => {
    const testId = "testId";
    const findArgs: CharacterFindArgs = {
      id: testId,
    };
    const entity: CharacterEntity = {
      id: testId,
      name: "name",
      description: "description",
      debut: 0,
    };
    const model: CharacterModel = {
      id: testId,
      name: "name",
      description: "description",
      debut: 0,
    };
    neo4jService.readCharacterById.mockReturnValue(Promise.resolve(entity));
    mapper.map.mockReturnValue(model as any);
    const response = await service.getCharacterById(findArgs);
    expect(neo4jService.readCharacterById).toHaveBeenNthCalledWith(1, testId);
    expect(mapper.map).toHaveBeenNthCalledWith(
      1,
      entity,
      CharacterEntity,
      CharacterModel,
    );
    expect(response).toBe(model);
  });
});

describe("updateCharacterById", () => {
  let service: CharactersService;
  let neo4jService: MockProxy<Neo4jService>;
  let logger: MockProxy<PinoLogger>;
  let mapper: MockProxy<Mapper>;
  beforeEach(async () => {
    neo4jService = mock<Neo4jService>();
    mapper = mock<Mapper>();
    logger = mock<PinoLogger>();
    service = new CharactersService(neo4jService, mapper, logger);
  });

  test("happy path should return response", async () => {
    const args: CharacterUpdateArgs = {
      id: "id",
      name: "name",
      description: "description",
      debut: 0,
    };
    const entity: CharacterEntity = {
      id: "id",
      name: "name",
      description: "description",
      debut: 0,
    };
    const model: CharacterModel = {
      id: "id",
      name: "name",
      description: "description",
      debut: 0,
    };
    neo4jService.updateCharacterById.mockReturnValue(Promise.resolve(entity));
    mapper.map
      .calledWith(entity as any, CharacterEntity as any, CharacterModel as any)
      .mockReturnValue(model as any);
    mapper.map
      .calledWith(
        args as any,
        CharacterUpdateArgs as any,
        CharacterEntity as any,
      )
      .mockReturnValue(entity as any);
    const response = await service.updateCharacterById(args);
    expect(neo4jService.updateCharacterById).toHaveBeenNthCalledWith(1, entity);
    expect(response.success).toBe(true);
    expect(response.character).toBe(model);
  });

  test("http exception path should rethrow error", async () => {
    const args: CharacterUpdateArgs = {
      id: "id",
      name: "name",
      description: "description",
      debut: 0,
    };
    const entity: CharacterEntity = {
      id: "id",
      name: "name",
      description: "description",
      debut: 0,
    };
    neo4jService.updateCharacterById.mockImplementationOnce(() => {
      throw new NotFoundException("Test err");
    });
    mapper.map
      .calledWith(
        args as any,
        CharacterUpdateArgs as any,
        CharacterEntity as any,
      )
      .mockReturnValue(entity as any);
    expect(async () => await service.updateCharacterById(args)).rejects.toThrow(
      NotFoundException,
    );
  });

  test("generic exception path should catch error and respond success:true", async () => {
    const args: CharacterUpdateArgs = {
      id: "id",
      name: "name",
      description: "description",
      debut: 0,
    };
    const entity: CharacterEntity = {
      id: "id",
      name: "name",
      description: "description",
      debut: 0,
    };
    neo4jService.updateCharacterById.mockImplementationOnce(() => {
      throw new Error("Test err");
    });
    mapper.map
      .calledWith(
        args as any,
        CharacterUpdateArgs as any,
        CharacterEntity as any,
      )
      .mockReturnValue(entity as any);
    const response = await service.updateCharacterById(args);
    expect(response.success).toBe(false);
    expect(response.character).toBeFalsy();
  });
});

describe("putCharacterRelation", () => {
  let service: CharactersService;
  let neo4jService: MockProxy<Neo4jService>;
  let logger: MockProxy<PinoLogger>;
  let mapper: MockProxy<Mapper>;
  beforeEach(async () => {
    neo4jService = mock<Neo4jService>();
    mapper = mock<Mapper>();
    logger = mock<PinoLogger>();
    service = new CharactersService(neo4jService, mapper, logger);
  });

  test("happy path returns response", async () => {
    const args: TDeepPartial<CharacterPutRelationArgs> = {};
    const dbInput: TDeepPartial<CharacterRelationInput> = {};
    const dbResponse: TDeepPartial<CharacterRelationEntity> = {};
    const graphqlResponse: TDeepPartial<CharacterRelationModel> = {};
    mapper.map
      .calledWith(
        args as any,
        CharacterPutRelationArgs as any,
        CharacterRelationInput as any,
      )
      .mockReturnValue(dbInput as any);
    mapper.map
      .calledWith(
        dbResponse as any,
        CharacterRelationEntity as any,
        CharacterRelationModel as any,
      )
      .mockReturnValue(graphqlResponse as any);
    neo4jService.putRelation.mockReturnValue(
      Promise.resolve(dbResponse as CharacterRelationEntity),
    );
    const response = await service.putCharacterRelation(
      args as CharacterPutRelationArgs,
    );
    expect(neo4jService.putRelation).toHaveBeenNthCalledWith(
      1,
      dbInput as CharacterRelationInput,
    );
    expect(response.success).toBe(true);
    expect(response.characterRelation).toBe(graphqlResponse);
  });

  test("http exception path returns error", async () => {
    const args: TDeepPartial<CharacterPutRelationArgs> = {};
    const dbInput: TDeepPartial<CharacterRelationInput> = {};
    mapper.map
      .calledWith(
        args as any,
        CharacterPutRelationArgs as any,
        CharacterRelationInput as any,
      )
      .mockReturnValue(dbInput as any);
    neo4jService.putRelation.mockImplementationOnce(async () => {
      throw new NotFoundException("Test err");
    });
    expect(
      async () =>
        await service.putCharacterRelation(args as CharacterPutRelationArgs),
    ).rejects.toThrow(NotFoundException);
  });

  test("general exception path returns success=false", async () => {
    const args: TDeepPartial<CharacterPutRelationArgs> = {};
    const dbInput: TDeepPartial<CharacterRelationInput> = {};
    mapper.map
      .calledWith(
        args as any,
        CharacterPutRelationArgs as any,
        CharacterRelationInput as any,
      )
      .mockReturnValue(dbInput as any);
    neo4jService.putRelation.mockImplementationOnce(async () => {
      throw new Error("Test err");
    });
    const response = await service.putCharacterRelation(
      args as CharacterPutRelationArgs,
    );
    expect(response.success).toBe(false);
    expect(response.characterRelation).toBeUndefined();
  });
});

describe("getRelations", () => {
  let service: CharactersService;
  let neo4jService: MockProxy<Neo4jService>;
  let logger: MockProxy<PinoLogger>;
  let mapper: MockProxy<Mapper>;
  beforeEach(async () => {
    neo4jService = mock<Neo4jService>();
    mapper = mock<Mapper>();
    logger = mock<PinoLogger>();
    service = new CharactersService(neo4jService, mapper, logger);
  });

  test("happy path for all relations", async () => {
    const args: TDeepPartial<CharacterRelationFindArgs> = {
      pageNo: 0,
      pageSize: 10,
    };
    const dbInput: TDeepPartial<CharacterRelationFindInput> = {};
    const dbResponse: TDeepPartial<CharacterRelationEntity>[] = [{}, {}];
    const graphqlModel: TDeepPartial<CharacterRelationModel>[] = [{}, {}];
    const graphqlAggregatedResponse: TDeepPartial<CharacterRelationsResponseModel> =
      {
        count: 2,
        pageNo: 0,
        pageSize: 10,
        relations: graphqlModel,
      };
    mapper.map
      .calledWith(
        args,
        CharacterRelationFindArgs as any,
        CharacterRelationFindInput as any,
      )
      .mockReturnValue(dbInput);
    neo4jService.readAllRelations.mockReturnValue(
      Promise.resolve(dbResponse as CharacterRelationEntity[]),
    );
    mapper.mapArray
      .calledWith(
        dbResponse,
        CharacterRelationEntity as any,
        CharacterRelationModel as any,
      )
      .mockReturnValue(graphqlModel as any);
    const response = await service.getRelations(
      args as CharacterRelationFindArgs,
    );
    expect(neo4jService.readCharacterRelations).not.toHaveBeenCalled();
    expect(neo4jService.readRelationBetweenCharacters).not.toHaveBeenCalled();
    expect(neo4jService.readAllRelations).toHaveBeenNthCalledWith(1, dbInput);
    expect(response).toEqual(graphqlAggregatedResponse);
  });

  test("happy path for relations between characters", async () => {
    const args: TDeepPartial<CharacterRelationFindArgs> = {
      pageNo: 0,
      pageSize: 10,
      ids: ["idx", "idy"],
    };
    const dbInput: TDeepPartial<CharacterRelationFindInput> = {
      idx: "idx",
      idy: "idy",
    };
    const dbResponse: TDeepPartial<CharacterRelationEntity>[] = [{}, {}];
    const graphqlModel: TDeepPartial<CharacterRelationModel>[] = [{}, {}];
    const graphqlAggregatedResponse: TDeepPartial<CharacterRelationsResponseModel> =
      {
        count: 2,
        pageNo: 0,
        pageSize: 10,
        relations: graphqlModel,
      };
    mapper.map
      .calledWith(
        args,
        CharacterRelationFindArgs as any,
        CharacterRelationFindInput as any,
      )
      .mockReturnValue(dbInput);
    neo4jService.readRelationBetweenCharacters.mockReturnValue(
      Promise.resolve(dbResponse as CharacterRelationEntity[]),
    );
    mapper.mapArray
      .calledWith(
        dbResponse,
        CharacterRelationEntity as any,
        CharacterRelationModel as any,
      )
      .mockReturnValue(graphqlModel as any);
    const response = await service.getRelations(
      args as CharacterRelationFindArgs,
    );
    expect(neo4jService.readCharacterRelations).not.toHaveBeenCalled();
    expect(neo4jService.readRelationBetweenCharacters).toHaveBeenNthCalledWith(
      1,
      dbInput,
    );
    expect(neo4jService.readAllRelations).not.toHaveBeenCalled();
    expect(response).toEqual(graphqlAggregatedResponse);
  });

  test("happy path for relations single character's relations", async () => {
    const args: TDeepPartial<CharacterRelationFindArgs> = {
      pageNo: 0,
      pageSize: 10,
      ids: ["idx"],
    };
    const dbInput: TDeepPartial<CharacterRelationFindInput> = {
      idx: "idx",
    };
    const dbResponse: TDeepPartial<CharacterRelationEntity>[] = [{}, {}];
    const graphqlModel: TDeepPartial<CharacterRelationModel>[] = [{}, {}];
    const graphqlAggregatedResponse: TDeepPartial<CharacterRelationsResponseModel> =
      {
        count: 2,
        pageNo: 0,
        pageSize: 10,
        relations: graphqlModel,
      };
    mapper.map
      .calledWith(
        args,
        CharacterRelationFindArgs as any,
        CharacterRelationFindInput as any,
      )
      .mockReturnValue(dbInput);
    neo4jService.readCharacterRelations.mockReturnValue(
      Promise.resolve(dbResponse as CharacterRelationEntity[]),
    );
    mapper.mapArray
      .calledWith(
        dbResponse,
        CharacterRelationEntity as any,
        CharacterRelationModel as any,
      )
      .mockReturnValue(graphqlModel as any);
    const response = await service.getRelations(
      args as CharacterRelationFindArgs,
    );
    expect(neo4jService.readRelationBetweenCharacters).not.toHaveBeenCalled();
    expect(neo4jService.readCharacterRelations).toHaveBeenNthCalledWith(
      1,
      dbInput,
    );
    expect(neo4jService.readAllRelations).not.toHaveBeenCalled();
    expect(response).toEqual(graphqlAggregatedResponse);
  });
});
