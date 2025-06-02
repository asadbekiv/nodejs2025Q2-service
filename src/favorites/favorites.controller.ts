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
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { FavoritesResponse } from './entities/favorite.entity';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiOkResponse({
    type: FavoritesResponse,
    description: 'List of all favorite tracks, albums, and artists',
  })
  @Get()
  async findAll() {
    return await this.favoritesService.getAll();
  }

  
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiParam({ name: 'id', description: 'Track UUID', type: String })
  @ApiOkResponse({ description: 'Track added to favorites' })
  @Post('/track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addTrackToFav(id);
  }

  @ApiOperation({ summary: 'Remove track from favorites' })
  @ApiParam({ name: 'id', description: 'Track UUID', type: String })
  @ApiNoContentResponse({ description: 'Track removed from favorites' })
  @HttpCode(204)
  @Delete('/track/:id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteTrackFromFav(id);
  }

  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiParam({ name: 'id', description: 'Album UUID', type: String })
  @ApiOkResponse({ description: 'Album added to favorites' })
  @Post('/album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addAlbumToFav(id);
  }

  @ApiOperation({ summary: 'Remove album from favorites' })
  @ApiParam({ name: 'id', description: 'Album UUID', type: String })
  @ApiNoContentResponse({ description: 'Album removed from favorites' })
  @HttpCode(204)
  @Delete('/album/:id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteAlbumFromFav(id);
  }

  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiParam({ name: 'id', description: 'Artist UUID', type: String })
  @ApiOkResponse({ description: 'Artist added to favorites' })
  @Post('/artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addArtistToFav(id);
  }

  @ApiOperation({ summary: 'Remove artist from favorites' })
  @ApiParam({ name: 'id', description: 'Artist UUID', type: String })
  @ApiNoContentResponse({ description: 'Artist removed from favorites' })
  @HttpCode(204)
  @Delete('/artist/:id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteArtistFromFav(id);
  }
}
