import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 128,
  })
  title: string;

  @Column('text')
  description: string;
}
