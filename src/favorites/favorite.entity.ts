import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Track } from 'src/tracks/track.entity';
import { PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'favorites' })
export class FavoritesResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable({
    name: 'fav_artist',
    joinColumn: {
      name: 'favId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'artistId',
      referencedColumnName: 'id',
    },
  })
  artists: Artist[];

  @ManyToMany(() => Album, { eager: true })
  @JoinTable({
    name: 'fav_album',
    joinColumn: {
      name: 'favId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'albumId',
      referencedColumnName: 'id',
    },
  })
  albums: Album[];

  @ManyToMany(() => Track, { eager: true })
  @JoinTable({
    name: 'fav_track',
    joinColumn: {
      name: 'favId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'trackId',
      referencedColumnName: 'id',
    },
  })
  tracks: Track[];
}
