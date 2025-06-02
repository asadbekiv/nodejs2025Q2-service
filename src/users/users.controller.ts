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
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private userseService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    type: User,
    isArray: true,
    description: 'List of all users',
  })
  @Get()
  async findAll() {
    return await this.userseService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User UUID', type: String })
  @ApiOkResponse({ type: User, description: 'User data' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userseService.getUserById(id);
    return user;
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: User, description: 'User created' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userseService.createUser(
      createUserDto.login,
      createUserDto.password,
    );

    return user;
  }

  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({ name: 'id', description: 'User UUID', type: String })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: User, description: 'User updated' })
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

  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User UUID', type: String })
  @ApiNoContentResponse({ description: 'User deleted' })
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userseService.delete(id);
  }
}
