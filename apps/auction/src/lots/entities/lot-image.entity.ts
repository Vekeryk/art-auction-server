import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Lot } from './lot.entity';

@Entity()
export class LotImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Lot)
  @JoinColumn({ name: 'lot_id' })
  lot: Lot;

  @Column({
    type: 'int',
    nullable: false,
  })
  index: number;

  @Column({
    length: 128,
    nullable: false,
  })
  image: string;
}
