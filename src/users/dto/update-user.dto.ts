import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'oldPassword123',
    description: 'Current user password',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'newPassword456',
    description: 'New password to set for the user',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
