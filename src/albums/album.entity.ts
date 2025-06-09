import { Artist } from 'src/artists/artist.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'albums' })
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, { nullable: true, eager: true })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
