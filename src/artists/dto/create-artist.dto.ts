import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateArtistDto {
  // @IsUUID()
  // id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
