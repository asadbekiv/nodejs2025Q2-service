import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    example: 'A Night at the Opera',
    description: 'Name of the album',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1975,
    description: 'Year the album was released',
  })
  @IsNumber()
  year: number;

  @ApiPropertyOptional({
    example: 'd7b5f3c5-2e4a-4b9d-8f3b-8b3d5c3d7e8a',
    description: 'Unique identifier of the artist, refers to Artist entity',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
