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
import { LoggerService } from 'src/logger/logger.service';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  async findAll() {
    this.loggerService.log('Getting all albums', 'AlbumsController');
    return await this.albumsService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(`Getting album by id: ${id}`, 'AlbumsController');
    const album = await this.albumsService.getAlbumById(id);
    return album;
  }

  @HttpCode(201)
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    this.loggerService.log(
      `Creating album with name: ${createAlbumDto.name}`,
      'AlbumsController',
    );
    const album = await this.albumsService.createAlbum(createAlbumDto);
    this.loggerService.log(
      `Album created with id: ${album.id}`,
      'AlbumsController',
    );
    return album;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    this.loggerService.log(`Updating album with id: ${id}`, 'AlbumsController');
    const updatedAlbum = await this.albumsService.updateAlbum(
      id,
      updateAlbumDto,
    );
    this.loggerService.log(`Album updated with id: ${id}`, 'AlbumsController');
    return updatedAlbum;
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(`Deleting album with id: ${id}`, 'AlbumsController');
    await this.albumsService.deleteAlbum(id);
    this.loggerService.log(`Album deleted with id: ${id}`, 'AlbumsController');
  }
}
