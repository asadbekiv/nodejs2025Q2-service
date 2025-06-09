import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FavoritesResponse } from './favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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

  private async helperFavorites() {
    let [favorites] = await this.favsRepository.find();
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

  async getAll() {
    const {
      artists: artistsIds,
      albums: albumsIds,
      tracks: tracksIds,
    } = await this.helperFavorites();

    const [artists, albums, tracks] = await Promise.all([
      this.artistsRepository.find({
        where: { id: In(artistsIds) },
      }),
      this.albumsRepository.find({
        where: { id: In(albumsIds) },
      }),
      this.tracksRepository.find({
        where: { id: In(tracksIds) },
      }),
    ]);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrackToFav(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(
        'Track is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favs = await this.helperFavorites();
    favs.tracks.push(id);
    await this.favsRepository.save(favs);
    return this.getAll();
  }

  async deleteTrackFromFav(id: string) {
    const favs = await this.helperFavorites();

    if (!favs.tracks.includes(id)) {
      throw new HttpException(
        'Track is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    favs.tracks = favs.tracks.filter((trackId) => trackId !== id);
    await this.favsRepository.save(favs);
  }

  async addAlbumToFav(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(
        'Album is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favs = await this.helperFavorites();
    favs.albums.push(id);
    await this.favsRepository.save(favs);
    return this.getAll();
  }

  async deleteAlbumFromFav(id: string) {
    const favs = await this.helperFavorites();

    if (!favs.albums.includes(id)) {
      throw new HttpException(
        'Album is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    favs.albums = favs.albums.filter((albumId) => albumId !== id);
    await this.favsRepository.save(favs);
  }

  async addArtistToFav(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(
        'Artist is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favs = await this.helperFavorites();
    favs.artists.push(id);
    await this.favsRepository.save(favs);
    return this.getAll();
  }

  async deleteArtistFromFav(id: string) {
    const favs = await this.helperFavorites();

    if (!favs.artists.includes(id)) {
      throw new HttpException(
        'Artist is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    favs.artists = favs.artists.filter((artistId) => artistId !== id);
    await this.favsRepository.save(favs);
  }
}
