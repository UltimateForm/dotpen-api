import { Module } from "@nestjs/common";
import { CharactersRepositoryService } from "./characters-repository.service";
import { Neo4jModule } from "@dotpen/neo4j";

@Module({
  imports: [Neo4jModule],
  providers: [CharactersRepositoryService],
  exports: [CharactersRepositoryService],
})
export class CharactersRepositoryModule {}
