import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as yaml from 'js-yaml';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './filter/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const loggerService = app.get(LoggerService);
  app.useGlobalFilters(new AllExceptionsFilter(loggerService));

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

  await app.listen(process.env.PORT);

  app.use((req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl, query, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      loggerService.log(
        `${method} ${originalUrl} ${JSON.stringify(query)} ${JSON.stringify(body)} - ${statusCode}`,
      );
    });
    next();
  });

  process.on('uncaughtException', (error) => {
    loggerService.error(`Uncaught Exception: ${error.message}`, error.stack);
  });

  process.on('unhandledRejection', (promise, reason) => {
    loggerService.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
  });
}
bootstrap();
