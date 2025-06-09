import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Track } from 'src/tracks/track.entity';
import { FavoritesResponse } from 'src/favorites/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Track, FavoritesResponse])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
