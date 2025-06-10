import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Album } from '../albums/album.entity';
import { Track } from '../tracks/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesResponse } from 'src/favorites/favorite.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(FavoritesResponse)
    private readonly favsRepository: Repository<FavoritesResponse>,
  ) {}

  async getAll(): Promise<Artist[]> {
    const artists = await this.artistsRepository.find();
    return artists;
  }

  async getArtistById(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const { name, grammy } = createArtistDto;
    const newArtist = {
      id: uuidv4(),
      name: name,
      grammy: grammy,
    };
    await this.artistsRepository.save(newArtist);

    return newArtist;
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist: Artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return await this.artistsRepository.save(artist);
  }

  async deleteArtist(id: string) {
    const artist: Artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    await this.favsRepository.delete({ id: artist.id });
    await this.albumsRepository.update({ artistId: id }, { artistId: null });
    await this.tracksRepository.update({ artistId: id }, { artistId: null });
    await this.artistsRepository.remove(artist);
  }
}
