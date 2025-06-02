import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Delete,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiBody,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiOperation({ summary: 'Get all albums' })
  @ApiOkResponse({
    type: Album,
    isArray: true,
    description: 'List of all albums',
  })
  @Get()
  async findAll() {
    return await this.albumsService.getAll();
  }

  @ApiOperation({ summary: 'Get album by ID' })
  @ApiParam({ name: 'id', description: 'Album UUID', type: String })
  @ApiOkResponse({ type: Album, description: 'Album data' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    console.log(id);
    return await this.albumsService.getAlbumById(id);
  }

  @ApiOperation({ summary: 'Create new album' })
  @ApiBody({ type: CreateAlbumDto })
  @ApiCreatedResponse({ type: Album, description: 'Album created' })
  @HttpCode(201)
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.createAlbum(createAlbumDto);
  }

  @ApiOperation({ summary: 'Update album by ID' })
  @ApiParam({ name: 'id', description: 'Album UUID', type: String })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiOkResponse({ type: Album, description: 'Album updated' })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @ApiOperation({ summary: 'Delete album by ID' })
  @ApiParam({ name: 'id', description: 'Album UUID', type: String })
  @ApiNoContentResponse({ description: 'Album deleted' })
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumsService.deleteAlbum(id);
  }
}
