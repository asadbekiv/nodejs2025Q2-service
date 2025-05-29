import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
