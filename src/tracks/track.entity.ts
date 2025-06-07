import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tracks' })
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, { nullable: true, eager: true })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null;

  @ManyToOne(() => Album, { nullable: true, eager: true })
  @JoinColumn({ name: 'albumId' })
  albumId: string | null;

  @Column()
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
