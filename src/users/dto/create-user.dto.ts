import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'MagnusCarelsen',
    description: 'User login or username',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'test1234',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
