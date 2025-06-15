import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Track } from 'src/tracks/track.entity';
import { Album } from 'src/albums/album.entity';
import { FavoritesResponse } from 'src/favorites/favorite.entity';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artist, Track, Album, FavoritesResponse]),
    LoggerModule,
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
