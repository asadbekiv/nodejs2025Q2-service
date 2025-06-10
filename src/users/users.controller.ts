import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Body,
  ParseUUIDPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private userseService: UsersService) {}

  @Get()
  async findAll() {
    return await this.userseService.getAllUsers();
  }
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userseService.getUserById(id);
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userseService.createUser(
      createUserDto.login,
      createUserDto.password,
    );

    return user;
  }

  @Put(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const updatedUser = await this.userseService.updatePassword(
      id,
      updateUserDto.oldPassword,
      updateUserDto.newPassword,
    );

    return updatedUser;
  }
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userseService.delete(id);
  }
}
