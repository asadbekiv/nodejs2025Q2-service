import { Module } from '@nestjs/common';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [
    FavoritesModule,
    TracksModule,
    ArtistsModule,
    UsersModule,
    AlbumsModule,
  ],
})
export class AppModule {}
