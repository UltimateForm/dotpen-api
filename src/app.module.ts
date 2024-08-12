import { Module } from "@nestjs/common";
import { CharactersGraphqlModule } from "@dotpen/charactersGraphql";
import { GraphQLModule } from "@nestjs/graphql";
import { CharactersGraphqlV2Module } from "@dotpen/charactersGraphqlV2";
import { CharactersRestModule } from "@dotpen/charactersRest";

import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { AuthRestModule } from "./authRest";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    LoggerModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
      inject: [ConfigService],
      global: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: {
        path: ".generated/schema.gql",
      },
    }),
    CharactersGraphqlModule,
    CharactersGraphqlV2Module,
    AuthRestModule,
    CharactersRestModule,
  ],
})
export class AppModule {}
