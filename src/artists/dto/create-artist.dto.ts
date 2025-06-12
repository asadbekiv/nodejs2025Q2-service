import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({
    example: 'Freddie Mercury',
    description: 'Name of the artist',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the artist has won a Grammy award',
  })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
