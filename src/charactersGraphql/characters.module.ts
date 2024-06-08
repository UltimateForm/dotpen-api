import { Module } from "@nestjs/common";
import { CharactersResolver } from "./characters.resolver";
import { Neo4jModule } from "@neo4j";
import { CharactersService } from "./characters.service";
import { RequestProfile, ResponseProfile } from "./mapper";

@Module({
  imports: [Neo4jModule],
  providers: [
    ResponseProfile,
    RequestProfile,
    CharactersService,
    CharactersResolver,
  ],
})
export class CharactersGraphqlModule {}
