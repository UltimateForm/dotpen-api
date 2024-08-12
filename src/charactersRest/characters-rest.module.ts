import { CharactersRepositoryModule } from "@dotpen/charactersRepository";
import { Module } from "@nestjs/common";
import { CharactersController } from "./characters.controller";
import { CharactersService } from "./characters.service";
import { ResponseProfile } from "./mapper/response.profile";

@Module({
  imports: [CharactersRepositoryModule],
  controllers: [CharactersController],
  providers: [CharactersService, ResponseProfile],
})
export class CharactersRestModule {}
