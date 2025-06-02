import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumsService } from '../albums/albums.service';
import { Album } from '../albums/entities/album.entity';
import { TracksService } from '../tracks/tracks.service';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  private artists: Artist[] = [];

  async getAll() {
    return this.artists;
  }

  async getArtistById(artistId: string) {
    const artist: Artist = await this.artists.find((e) => e.id == artistId);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const newArtist = {
      id: uuidv4(),
      name: name,
      grammy: grammy,
    };
    this.artists.push(newArtist);

    return plainToClass(Artist, newArtist);
  }

  async updateArtist(artistId: string, updateArtistDto: UpdateArtistDto) {
    const artist: Artist = await this.artists.find((e) => e.id == artistId);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  async deleteArtist(artistId: string) {
    const artist: number = this.artists.findIndex(
      (artist: Artist): boolean => artist.id === artistId,
    );
    if (artist === -1) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }
    this.artists.splice(artist, 1);
    const albums: Album[] = await this.albumsService.getAll();
    const tracks: Track[] = await this.tracksService.getAll();

    for (const album of albums) {
      album.artistId = null;
    }
    for (const track of tracks) {
      track.artistId = null;
    }
  }
}
