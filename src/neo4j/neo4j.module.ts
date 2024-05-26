import { Module } from "@nestjs/common";
import { Neo4jService } from "./neo4j.service";
import neo4j from "neo4j-driver";
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [
    {
      provide: neo4j.Driver,
      useFactory: (config: ConfigService) => {
        const userName = config.get("NEO4J_USERNAME");
        const password = config.get("NEO4J_PASSWORD");
        const uri = config.get("NEO4J_URI");
        const driverServ = neo4j.driver(
          uri,
          neo4j.auth.basic(userName, password),
          { disableLosslessIntegers: true },
        );
        return driverServ;
      },
      inject: [ConfigService],
    },
    Neo4jService,
  ],
  exports: [Neo4jService],
})
export class Neo4jModule {}
