import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Album } from 'src/albums/album.entity';
import { Track } from 'src/tracks/track.entity';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];
}
