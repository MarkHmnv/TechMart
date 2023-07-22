import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as process from "process";
import {HttpExceptionFilter} from "./exception/filter/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 8080);
}
bootstrap();