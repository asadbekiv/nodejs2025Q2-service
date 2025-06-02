import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsUUID()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsNumber()
  duration: number;
}
