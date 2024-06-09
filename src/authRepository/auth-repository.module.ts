import { Neo4jModule } from "@dotpen/neo4j";
import { Module } from "@nestjs/common";
import { AuthRepositoryService } from "./auth-repository.service";

@Module({
  imports: [Neo4jModule],
  providers: [AuthRepositoryService],
  exports: [AuthRepositoryService],
})
export class AuthRepositoryModule {}
