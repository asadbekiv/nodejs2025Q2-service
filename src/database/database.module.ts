import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {databaseProviders} from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports:[DataSource]
})
export class DatabaseModule {}
