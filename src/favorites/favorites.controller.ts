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

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.getAll();
  }

  @HttpCode(201)
  @Post('/track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addTrackToFav(id);
  }
  @HttpCode(204)
  @Delete('/track/:id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteTrackFromFav(id);
  }

  @HttpCode(201)
  @Post('/album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addAlbumToFav(id);
  }
  @HttpCode(204)
  @Delete('/album/:id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteAlbumFromFav(id);
  }

  @HttpCode(201)
  @Post('/artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addArtistToFav(id);
  }
  @HttpCode(204)
  @Delete('/artist/:id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteArtistFromFav(id);
  }
}
