import { forwardRef, Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [AlbumsModule, forwardRef(() => ArtistsModule), TracksModule],
  exports: [FavoritesService],
})
export class FavoritesModule {}
