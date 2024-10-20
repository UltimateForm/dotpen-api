import { CharactersRepositoryModule } from "@dotpen/charactersRepository";
import { Module } from "@nestjs/common";
import { CharactersController } from "./characters.controller";
import { CharactersService } from "./characters.service";
import { ResponseProfile } from "./mapper/response.profile";
import { RequestProfile } from "./mapper/request.profile";
import { RelationsService } from "./relations.service";
import { RelationsController } from "./relations.controller";

@Module({
  imports: [CharactersRepositoryModule],
  controllers: [CharactersController, RelationsController],
  providers: [
    CharactersService,
    RelationsService,
    ResponseProfile,
    RequestProfile,
  ],
})
export class CharactersRestModule {}
