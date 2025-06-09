import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { Track } from '../tracks/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesResponse } from 'src/favorites/favorite.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(FavoritesResponse)
    private readonly favsRepository: Repository<FavoritesResponse>,
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
    return {
      id: id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };
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
    let album: Album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    const updatedAlbum = await this.albumsRepository.save(album);

    return updatedAlbum;
  }

  async deleteAlbum(id: string): Promise<void> {
    let album: Album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    await this.favsRepository.delete({ id: album.id });
    await this.tracksRepository.update({ albumId: id }, { albumId: null });
    await this.albumsRepository.remove(album);
  }
}
