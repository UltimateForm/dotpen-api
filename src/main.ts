import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "nestjs-pino";
import { registerEnumType } from "@nestjs/graphql";
import {
  CharacterRelationLevel,
  CharacterRelationType,
} from "./charactersGraphql";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(new ValidationPipe());
  registerEnumType(CharacterRelationLevel, {
    name: "CharacterRelationLevel",
  });
  registerEnumType(CharacterRelationType, {
    name: "CharacterRelationType",
  });
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
