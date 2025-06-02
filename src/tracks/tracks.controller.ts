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
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiBody,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiOkResponse({
    type: Track,
    isArray: true,
    description: 'List of all tracks',
  })
  @Get()
  async findAll() {
    return await this.tracksService.getAll();
  }

  @ApiOperation({ summary: 'Get track by ID' })
  @ApiParam({ name: 'id', description: 'Track UUID', type: String })
  @ApiOkResponse({ type: Track, description: 'Track data' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.tracksService.getTrackById(id);
  }

  @ApiOperation({ summary: 'Create new track' })
  @ApiBody({ type: CreateTrackDto })
  @ApiCreatedResponse({ type: Track, description: 'Track created' })
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.createTrack(createTrackDto);
  }

  @ApiOperation({ summary: 'Update track by ID' })
  @ApiParam({ name: 'id', description: 'Track UUID', type: String })
  @ApiBody({ type: UpdateTrackDto })
  @ApiOkResponse({ type: Track, description: 'Track updated' })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return await this.tracksService.updateTrack(id, updateTrackDto);
  }

  @ApiOperation({ summary: 'Delete track by ID' })
  @ApiParam({ name: 'id', description: 'Track UUID', type: String })
  @ApiNoContentResponse({ description: 'Track deleted' })
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.tracksService.deleteTrack(id);
  }
}
