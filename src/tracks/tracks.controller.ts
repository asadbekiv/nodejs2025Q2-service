import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  async findAll() {
    this.loggerService.log('Getting all tracks', 'TracksController');
    return await this.tracksService.getAll();
  }
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(`Getting track by id: ${id}`, 'TracksController');
    return await this.tracksService.getTrackById(id);
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    this.loggerService.log(
      `Creating track with name: ${createTrackDto.name}`,
      'TracksController',
    );
    this.loggerService.log(
      `Track created with name: ${createTrackDto.name}`,
      'TracksController',
    );
    return await this.tracksService.createTrack(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    this.loggerService.log(`Updating track with id: ${id}`, 'TracksController');
    this.loggerService.log(`Track updated with id: ${id}`, 'TracksController');
    return await this.tracksService.updateTrack(id, updateTrackDto);
  }
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(`Deleting track with id: ${id}`, 'TracksController');
    this.loggerService.log(`Track deleted with id: ${id}`, 'TracksController');
    return await this.tracksService.deleteTrack(id);
  }
}
