import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Lot } from '../lots/lot.entity';

@Entity()
export class LotImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Lot)
  @JoinColumn({ name: 'lot_id' })
  lot: Lot;

  @Column({
    length: 128,
    nullable: false,
  })
  image: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
