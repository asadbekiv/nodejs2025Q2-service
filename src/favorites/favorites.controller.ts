import {
  Controller,
  Body,
  Param,
  Put,
  Delete,
  Get,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.getAll();
  }

  @Post('/track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addTrackToFav(id);
  }

  @Delete('/track/:id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteTrackFromFav(id);
  }

  @Post('/track/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addAlbumToFav(id);
  }

  @Delete('/track/:id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteAlbumFromFav(id);
  }

  @Post('/track/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addArtistToFav(id);
  }

  @Delete('/track/:id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteArtistFromFav(id);
  }
}
