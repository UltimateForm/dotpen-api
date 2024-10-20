import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { CharactersController } from "./characters.controller";
import { AuthGuard } from "@dotpen/common/guards";
import { Body, Controller, Get, Put, Query, UseGuards } from "@nestjs/common";
import {
  CharacterRelationPutModel,
  CharacterRelationsRequestModel,
} from "./models/request";
import {
  CharacterRelationOperationModel,
  CharacterRelationsResponseModel,
} from "./models/response";
import { RelationsService } from "./relations.service";

@Controller("relations")
@UseGuards(AuthGuard)
export class RelationsController {
  static className = "RelationsController";
  constructor(
    private service: RelationsService,
    @InjectPinoLogger(CharactersController.className)
    private readonly logger: PinoLogger,
  ) {}

  @Get()
  relations(
    @Query() params: CharacterRelationsRequestModel,
  ): Promise<CharacterRelationsResponseModel> {
    return this.service.getRelations(params);
  }

  @Put()
  putRelation(
    @Body() relationBody: CharacterRelationPutModel,
  ): Promise<CharacterRelationOperationModel> {
    return this.service.putCharacterRelation(relationBody);
  }
}
