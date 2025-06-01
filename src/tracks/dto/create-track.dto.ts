import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  // @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsUUID()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsNumber()
  // @IsNotEmpty()
  duration: number;
}
