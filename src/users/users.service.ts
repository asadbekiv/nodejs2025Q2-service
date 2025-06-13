import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByLoginAndPassword(login: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { login: login.trim() },
    });
    if (!user) {
      return null;
    }
    const isVaildPassword: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    return isVaildPassword ? user : null;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return plainToInstance(User, users);
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToInstance(User, user);
  }

  async createUser(login: string, password: string): Promise<User> {
    const newUser: User = {
      id: uuidv4(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await this.usersRepository.save(newUser);

    return plainToInstance(User, await this.usersRepository.save(newUser));
  }

  async updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(
        'Incorrect old password.Please check it again !',
      );
    }
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return plainToInstance(User, await this.usersRepository.save(user));
  }

  async delete(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.remove(user);
  }
}
