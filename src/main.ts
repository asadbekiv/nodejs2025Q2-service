import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const apiYamlPath = path.join(process.cwd(), 'doc/api.yaml');

  let file: string;
  try {
    file = await fs.readFile(apiYamlPath, 'utf8');
  } catch (err) {
    console.error('Failed to read api.yaml:', err);
    process.exit(1);
  }
  const swaggerDocument = yaml.load(file);

  SwaggerModule.setup('doc/api', app, swaggerDocument as OpenAPIObject);

  await app.listen(4000);
}
bootstrap();
