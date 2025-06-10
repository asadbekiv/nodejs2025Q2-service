import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({ name: 'favorites' })
export class FavoritesResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { array: true, default: () => 'ARRAY[]::UUID[]' })
  artists: string[];

  @Column('uuid', { array: true, default: () => 'ARRAY[]::UUID[]' })
  albums: string[];

  @Column('uuid', { array: true, default: () => 'ARRAY[]::UUID[]' })
  tracks: string[];
}
