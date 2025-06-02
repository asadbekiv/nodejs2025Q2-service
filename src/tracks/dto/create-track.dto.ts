import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    example: 'Bohemian Rhapsody',
    description: 'Name of the track',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'd7b5f3c5-2e4a-4b9d-8f3b-8b3d5c3d7e8a',
    description: 'Unique identifier of the artist, refers to Artist entity',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @ApiPropertyOptional({
    example: 'e7b5f3c5-2e4a-4b9d-8f3b-8b3d5c3d7e8c',
    description: 'Unique identifier of the album, refers to Album entity',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  albumId: string | null; // refers to Album

  @ApiProperty({
    example: 354,
    description: 'Duration of the track in seconds',
  })
  @IsNumber()
  duration: number;
}
