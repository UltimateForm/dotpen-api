import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "nestjs-pino";
import { registerEnumType } from "@nestjs/graphql";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import {
  CharacterRelationLevel,
  CharacterRelationType,
} from "./charactersGraphql";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config = new DocumentBuilder()
    .setTitle("DotPen API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document, {
    jsonDocumentUrl: "swagger.json",
  });
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
