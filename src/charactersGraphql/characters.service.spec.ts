import { CharacterEntity, Neo4jService } from "@neo4j";
import { CharactersService } from "./characters.service";
import { Mapper } from "@automapper/core";
import { PinoLogger } from "nestjs-pino";
import { MockProxy, mock } from "jest-mock-extended";
import { CharacterModel } from "./models/response";
import { CharacterFindArgs, CharacterUpdateArgs } from "./models/args";
import { NotFoundException } from "@nestjs/common";

describe("CharactersService", () => {
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

  describe("updateCharacterById", () => {
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
        .calledWith(
          entity as any,
          CharacterEntity as any,
          CharacterModel as any,
        )
        .mockReturnValue(model as any);
      mapper.map
        .calledWith(
          args as any,
          CharacterUpdateArgs as any,
          CharacterEntity as any,
        )
        .mockReturnValue(entity as any);
      const response = await service.updateCharacterById(args);
      expect(neo4jService.updateCharacterById).toHaveBeenNthCalledWith(
        1,
        entity,
      );
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
      expect(
        async () => await service.updateCharacterById(args),
      ).rejects.toThrow(NotFoundException);
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
});
