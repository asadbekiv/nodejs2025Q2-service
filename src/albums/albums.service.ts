import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { TracksService } from '../tracks/tracks.service';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class AlbumsService {
  constructor(private readonly tracksService: TracksService) {}

  private albums: Album[] = [];

  async getAll(): Promise<Album[]> {
    return await this.albums;
  }

  async getAlbumById(albumId: string): Promise<Album> {
    const album: Album = await this.albums.find((e) => e.id == albumId);
    if (!album) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };

    this.albums.push(newAlbum);

    return plainToClass(Album, newAlbum);
  }

  async updateAlbum(albumId: string, updateAlbumDto: UpdateAlbumDto) {
    const album: Album = await this.albums.find((e) => e.id == albumId);
    if (!album) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return album;
  }

  async deleteAlbum(albumId: string) {
    const album = this.albums.findIndex((album) => album.id === albumId);
    if (album === -1) {
      throw new NotFoundException(`Album with ID ${album} not found`);
    }
    this.albums.splice(album, 1);

    const tracks: Track[] = await this.tracksService.getAll();
    for (const track of tracks) {
      track.albumId = null;
    }
  }
}
