import 'dotenv/config';
import { Module } from '@nestjs/common';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Artist } from './artists/artist.entity';
import { Album } from './albums/album.entity';
import { Track } from './tracks/track.entity';
import { FavoritesResponse } from './favorites/favorite.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.PORT_POSTGRES, 10) || 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      entities: [User, Artist, Album, Track, FavoritesResponse],
    }),
    FavoritesModule,
    TracksModule,
    ArtistsModule,
    UsersModule,
    AlbumsModule,
    AuthModule,
  ],
})
export class AppModule {}
