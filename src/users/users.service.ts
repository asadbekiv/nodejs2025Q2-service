import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  async getUserById(id: string) {
    const user = await this.users.find((user) => user.id == id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(login: string, password: string) {
    const newUser: User = {
      id: uuidv4(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);

    return plainToClass(User, newUser);
  }

  updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): User {
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(
        'Incorrect old password.Please check it again !',
      );
    }
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return plainToClass(User, user);
  }

  delete(userId: string): void {
    const user = this.users.findIndex((user) => user.id === userId);
    if (user === -1) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    this.users.splice(user, 1);
  }
}
