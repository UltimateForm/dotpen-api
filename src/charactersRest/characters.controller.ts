import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { CharacterCreateModel, PaginationRequestModel } from "./models/request";
import { AuthGuard } from "@dotpen/common/guards";
import {
  CharacterModel,
  CharacterOperationModel,
  CharactersResponseModel,
} from "./models/response";
import { Neo4jExceptionFilter } from "@dotpen/common/filters";

@Controller("characters")
@UseFilters(new Neo4jExceptionFilter())
@UseGuards(AuthGuard)
export class CharactersController {
  static className = "CharactersController";
  constructor(
    private service: CharactersService,
    @InjectPinoLogger(CharactersController.className)
    private readonly logger: PinoLogger,
  ) {}

  @Get()
  characters(
    @Query() params: PaginationRequestModel,
  ): Promise<CharactersResponseModel> {
    return this.service.getCharacters(params);
  }

  @Get(":id")
  characterById(@Param("id") id: string): Promise<CharacterModel> {
    return this.service.getCharacterById(id);
  }

  @Delete(":id")
  deleteCharacterById(
    @Param("id") id: string,
  ): Promise<CharacterOperationModel> {
    return this.service.deleteCharacterById(id);
  }

  @Post()
  createCharacter(
    @Body() characterCreateModel: CharacterCreateModel,
  ): Promise<CharacterOperationModel> {
    return this.service.createCharacter(characterCreateModel);
  }
}
