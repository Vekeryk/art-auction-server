import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GenericEntity } from '@app/common/generic-entity';

@Entity()
export class Bid extends GenericEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  lotId: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'int', nullable: true })
  amount: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
