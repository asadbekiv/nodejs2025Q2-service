import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FavoritesResponse } from './favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Track } from 'src/tracks/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesResponse)
    private readonly favsRepository: Repository<FavoritesResponse>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async getAll() {
    let favorites = await this.favsRepository.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });

    if (!favorites) {
      favorites = this.favsRepository.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      await this.favsRepository.save(favorites);
    }

    return favorites;
  }

  async addTrackToFav(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(
        'Track is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.getAll();

    if (!favorites.tracks.find((e) => e.id === id)) {
      favorites.tracks.push(track);
      await this.favsRepository.save(favorites);
    }

    return track;
  }

  async deleteTrackFromFav(id: string) {
    const favorites = await this.getAll();

    const index = favorites.tracks.findIndex((e) => e.id === id);

    if (index === -1) {
      throw new HttpException(
        'Track is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    favorites.tracks.splice(index, 1);
    await this.favsRepository.save(favorites);
  }

  async addAlbumToFav(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(
        'Album is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.getAll();

    if (!favorites.albums.find((e) => e.id === id)) {
      favorites.albums.push(album);
      await this.favsRepository.save(favorites);
    }

    return album;
  }

  async deleteAlbumFromFav(id: string) {
    const favorites = await this.getAll();

    const index = favorites.albums.findIndex((e) => e.id === id);

    if (index === -1) {
      throw new HttpException(
        'Album is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    favorites.albums.splice(index, 1);
    await this.favsRepository.save(favorites);
  }

  async addArtistToFav(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(
        'Artist is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.getAll();

    if (!favorites.artists.find((e) => e.id === id)) {
      favorites.artists.push(artist);
      await this.favsRepository.save(favorites);
    }

    return artist;
  }

  async deleteArtistFromFav(id: string) {
    const favorites = await this.getAll();

    const index = favorites.artists.findIndex((e) => e.id === id);

    if (index === -1) {
      throw new HttpException(
        'Artist is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    favorites.artists.splice(index, 1);
    await this.favsRepository.save(favorites);
  }
}
