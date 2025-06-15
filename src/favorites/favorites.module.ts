import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artists/artist.entity';
import { Album } from 'src/albums/album.entity';
import { FavoritesResponse } from './favorite.entity';
import { Track } from 'src/tracks/track.entity';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    TypeOrmModule.forFeature([Artist, Album, Track, FavoritesResponse]),LoggerModule
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
