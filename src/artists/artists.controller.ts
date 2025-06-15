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
import { LoggerService } from 'src/logger/logger.service';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  async getAll() {
    this.loggerService.log('Getting all artists', 'ArtistsController');
    return await this.artistsService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(`Getting artist by id: ${id}`, 'ArtistsController');
    const artist = await this.artistsService.getArtistById(id);
    return artist;
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    this.loggerService.log(
      `Creating artist with name: ${createArtistDto.name}`,
      'ArtistsController',
    );
    const artist = await this.artistsService.createArtist(createArtistDto);
    this.loggerService.log(
      `Artist created with id: ${artist.id}`,
      'ArtistsController',
    );
    return artist;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    this.loggerService.log(
      `Updating artist with id: ${id}`,
      'ArtistsController',
    );
    const updatedArtist = await this.artistsService.updateArtist(
      id,
      updateArtistDto,
    );
    this.loggerService.log(
      `Artist updated with id: ${id}`,
      'ArtistsController',
    );
    return updatedArtist;
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(
      `Deleting artist with id: ${id}`,
      'ArtistsController',
    );
    await this.artistsService.deleteArtist(id);
    this.loggerService.log(
      `Artist deleted with id: ${id}`,
      'ArtistsController',
    );
  }
}
