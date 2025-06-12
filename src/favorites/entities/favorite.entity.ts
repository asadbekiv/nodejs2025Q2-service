import { ApiProperty } from '@nestjs/swagger';
import { Track } from 'src/tracks/entities/track.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';

export class FavoritesResponse {
  @ApiProperty({ type: [Artist], description: 'List of favorite artists' })
  artists: Artist[];

  @ApiProperty({ type: [Album], description: 'List of favorite albums' })
  albums: Album[];

  @ApiProperty({ type: [Track], description: 'List of favorite tracks' })
  tracks: Track[];
}
