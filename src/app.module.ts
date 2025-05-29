import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { ArtistsService } from './artists/artists.service';
import { TracksService } from './tracks/tracks.service';
import { FavoritesService } from './favorites/favorites.service';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsModule } from './albums/albums.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    FavoritesModule,
    TracksModule,
    ArtistsModule,
    UsersModule,
    AlbumsModule,
  ],
  controllers: [AlbumsController, UsersController],
  providers: [UsersService, ArtistsService, TracksService, FavoritesService],
})
export class AppModule {}
