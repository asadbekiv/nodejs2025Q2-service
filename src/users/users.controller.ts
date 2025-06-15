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
import { LoggerService } from 'src/logger/logger.service';

@Controller('user')
export class UsersController {
  constructor(
    private userseService: UsersService,
    private loggerService: LoggerService,
  ) {}

  @Get()
  async findAll() {
    this.loggerService.log('Getting all users', 'UsersController');
    return await this.userseService.getAllUsers();
  }
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(`Getting user by id: ${id}`, 'UsersController');
    const user = await this.userseService.getUserById(id);
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.loggerService.log(
      `Creating user with login: ${createUserDto.login}`,
      'UsersController',
    );
    const user = await this.userseService.createUser(
      createUserDto.login,
      createUserDto.password,
    );
    this.loggerService.log(
      `User created with id: ${user.id}`,
      'UsersController',
    );

    return user;
  }

  @Put(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    this.loggerService.log(
      `Updating password for user id: ${id}`,
      'UsersController',
    );
    const updatedUser = await this.userseService.updatePassword(
      id,
      updateUserDto.oldPassword,
      updateUserDto.newPassword,
    );
    this.loggerService.log(
      `Password updated for user id: ${id}`,
      'UsersController',
    );

    return updatedUser;
  }
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggerService.log(`Deleting user with id: ${id}`, 'UsersController');
    await this.userseService.delete(id);
    this.loggerService.log(`User deleted with id: ${id}`, 'UsersController');
  }
}
