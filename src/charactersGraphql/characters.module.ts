import { Module } from "@nestjs/common";
import { CharactersResolver } from "./characters.resolver";
import { CharactersRepositoryModule } from "@dotpen/charactersRepository";
import { CharactersService } from "./characters.service";
import { RequestProfile, ResponseProfile } from "./mapper";

@Module({
  imports: [CharactersRepositoryModule],
  providers: [
    ResponseProfile,
    RequestProfile,
    CharactersService,
    CharactersResolver,
  ],
})
export class CharactersGraphqlModule {}
