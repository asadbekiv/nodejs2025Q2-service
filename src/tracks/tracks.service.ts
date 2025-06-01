import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  async getAll() {
    return await this.tracks;
  }

  async getTrackById(trackId: string) {
    const track = await this.tracks.find((track) => track.id == trackId);
    if (!track) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }

    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };

    this.tracks.push(newTrack);
    return plainToClass(Track, newTrack);
  }

  async updateTrack(trackId: string, updateTrackDto: UpdateTrackDto) {
    const track: Track = await this.tracks.find((e) => e.id == trackId);
    if (!track) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }

    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;

    return track;
  }

  async deleteTrack(trackId: string) {
    const track = this.tracks.findIndex((track) => track.id === trackId);
    if (track === -1) {
      throw new NotFoundException(`Track with ID ${track} not found`);
    }
    this.tracks.splice(track, 1);
  }
}
