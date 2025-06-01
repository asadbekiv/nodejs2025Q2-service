import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesResponse } from './favorite.entity';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
  ) {}

  private favorites: FavoritesResponse = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async getAll(): Promise<FavoritesResponse> {
    return await this.favorites;
  }

  async addTrackToFav(trackId: string) {
    try {
      const track = await this.tracksService.getTrackById(trackId);
      this.favorites.tracks.push(track);
      return { message: 'Track add to Favorites' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          'Track is not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw error;
    }
  }

  async deleteTrackFromFav(trackId: string) {
    const trackIndex = this.favorites.tracks.findIndex(
      (track) => track.id === trackId,
    );

    if (trackIndex === -1) {
      throw new HttpException(
        `Track with ID ${trackId} is not in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.favorites.tracks.splice(trackIndex, 1);

    return { message: 'Track remove from Favorites' };
  }

  async addAlbumToFav(albumId: string) {
    try {
      const album = await this.albumsService.getAlbumById(albumId);
      this.favorites.albums.push(album);
      return { message: 'Album add to Favorites' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          'Album is not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw error;
    }
  }

  async deleteAlbumFromFav(albumId: string) {
    const albumIndex = this.favorites.albums.findIndex(
      (album) => album.id === albumId,
    );

    if (albumIndex === -1) {
      throw new HttpException(
        `Album with ID ${albumId} is not in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.favorites.albums.splice(albumIndex, 1);

    return { message: 'Album remove from Favorites' };
  }

  async addArtistToFav(artistId: string) {
    try {
      const artist = await this.artistsService.getArtistById(artistId);
      this.favorites.artists.push(artist);
      return { message: 'Artist add to Favorites' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          'Artist is not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw error;
    }
  }

  async deleteArtistFromFav(artistId: string) {
    const artistIndex = this.favorites.artists.findIndex(
      (artist) => artist.id === artistId,
    );

    if (artistIndex === -1) {
      throw new HttpException(
        `Artist with ID ${artistId} is not in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.favorites.artists.splice(artistIndex, 1);

    return { message: 'Artist remove from Favorites' };
  }
}
