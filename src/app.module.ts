import { Module } from "@nestjs/common";
import { CharactersGraphqlModule } from "@charactersGraphql";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    LoggerModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: {
        path: ".generated/schema.gql",
      },
    }),
    CharactersGraphqlModule,
  ],
})
export class AppModule {}
