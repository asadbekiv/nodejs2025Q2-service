import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiBody,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @ApiOperation({ summary: 'Get all artists' })
  @ApiOkResponse({
    type: Artist,
    isArray: true,
    description: 'List of all artists',
  })
  @Get()
  async getAll() {
    return await this.artistsService.getAll();
  }

  @ApiOperation({ summary: 'Get artist by ID' })
  @ApiParam({ name: 'id', description: 'Artist UUID', type: String })
  @ApiOkResponse({ type: Artist, description: 'Artist data' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.artistsService.getArtistById(id);
  }
  @ApiOperation({ summary: 'Create new artist' })
  @ApiBody({ type: CreateArtistDto })
  @ApiCreatedResponse({ type: Artist, description: 'Artist created' })
  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.createArtist(createArtistDto);
  }

  @ApiOperation({ summary: 'Update artist by ID' })
  @ApiParam({ name: 'id', description: 'Artist UUID', type: String })
  @ApiBody({ type: UpdateArtistDto })
  @ApiOkResponse({ type: Artist, description: 'Artist updated' })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistsService.updateArtist(id, updateArtistDto);
  }

  @ApiOperation({ summary: 'Delete artist by ID' })
  @ApiParam({ name: 'id', description: 'Artist UUID', type: String })
  @ApiNoContentResponse({ description: 'Artist deleted' })
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.artistsService.deleteArtist(id);
  }
}
