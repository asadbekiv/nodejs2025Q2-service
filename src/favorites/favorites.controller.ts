import {
  Controller,
  Param,
  Delete,
  Get,
  Post,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { LoggerService } from 'src/logger/logger.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  async findAll() {
    this.loggerService.log('Getting all favorites', 'FavoritesController');
    return await this.favoritesService.getAll();
  }

  @HttpCode(201)
  @Post('/track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(
      `Adding track to favorites: ${id}`,
      'FavoritesController',
    );
    return await this.favoritesService.addTrackToFav(id);
  }

  @HttpCode(204)
  @Delete('/track/:id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(
      `Deleting track from favorites: ${id}`,
      'FavoritesController',
    );
    return await this.favoritesService.deleteTrackFromFav(id);
  }

  @HttpCode(201)
  @Post('/album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(
      `Adding album to favorites: ${id}`,
      'FavoritesController',
    );
    return await this.favoritesService.addAlbumToFav(id);
  }

  @HttpCode(204)
  @Delete('/album/:id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(
      `Deleting album from favorites: ${id}`,
      'FavoritesController',
    );
    return await this.favoritesService.deleteAlbumFromFav(id);
  }

  @HttpCode(201)
  @Post('/artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(
      `Adding artist to favorites: ${id}`,
      'FavoritesController',
    );
    return await this.favoritesService.addArtistToFav(id);
  }

  @HttpCode(204)
  @Delete('/artist/:id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(
      `Deleting artist from favorites: ${id}`,
      'FavoritesController',
    );
    return await this.favoritesService.deleteArtistFromFav(id);
  }
}
