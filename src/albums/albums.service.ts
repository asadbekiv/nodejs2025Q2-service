import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { Track } from '../tracks/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  async getAll(): Promise<Album[]> {
    const albums = await this.albumsRepository.find();
    return albums;
  }

  async getAlbumById(id: string): Promise<Album> {
    const album: Album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };

    await this.albumsRepository.save(newAlbum);

    return newAlbum;
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album: Album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    await this.albumsRepository.save(album);

    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    const album: Album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    await this.albumsRepository.remove(album);

    // const tracks: Track[] = await this.tracksService.getAll();
    // for (const track of tracks) {
    //   track.albumId = null;
    // }
  }
}
