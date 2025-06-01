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

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async findAll() {
    return await this.albumsService.getAll();
  }
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    console.log(id);
    return await this.albumsService.getAlbumById(id);
  }

  @HttpCode(201)
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumsService.updateAlbum(id, updateAlbumDto);
  }
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumsService.deleteAlbum(id);
  }
}
