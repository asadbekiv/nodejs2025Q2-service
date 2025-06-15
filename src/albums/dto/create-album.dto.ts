import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly year: number;

  @IsUUID()
  @IsOptional()
  readonly artistId: string | null;
}
