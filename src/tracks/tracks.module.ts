import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Track]),LoggerModule],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
