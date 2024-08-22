import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { PaginationRequestModel } from "./models/request";
import { AuthGuard } from "@dotpen/common/guards";

@Controller("characters")
@UseGuards(AuthGuard)
export class CharactersController {
  static className = "CharactersController";
  constructor(
    private service: CharactersService,
    @InjectPinoLogger(CharactersController.className)
    private readonly logger: PinoLogger,
  ) {}

  @Get()
  characters(@Query() params: PaginationRequestModel) {
    return this.service.getCharacters(params);
  }

  @Get(":id")
  characterById(@Param("id") id: string) {
    return this.service.getCharacterById(id);
  }

  @Delete(":id")
  deleteCharacterById(@Param("id") id: string) {
    return this.service.deleteCharacterById(id);
  }
}