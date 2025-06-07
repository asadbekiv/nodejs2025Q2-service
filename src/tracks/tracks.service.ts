import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  async getAll(): Promise<Track[]> {
    const tracks = await this.tracksRepository.find();
    return tracks;
  }

  async getTrackById(id: string): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };
    // await this.tracksRepository.save(newTrack);

    return await this.tracksRepository.save(newTrack);
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track: Track = await this.tracksRepository.preload({
      id,
      ...updateTrackDto,
    });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    // track.name = updateTrackDto.name;
    // track.artistId = updateTrackDto.artistId;
    // track.albumId = updateTrackDto.albumId;
    // track.duration = updateTrackDto.duration;

    return await this.tracksRepository.save(track);
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    await this.tracksRepository.remove(track);
  }
}
