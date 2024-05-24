import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Notification } from '../notifications/notification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128, unique: true, nullable: false })
  username: string;

  @Column({ length: 128, unique: true, nullable: false })
  email: string;

  @Column('text')
  passwordHash: string;

  @Column({ length: 128 })
  firstName: string;

  @Column({ length: 128 })
  lastName: string;

  @Column({ type: 'int', default: 0 })
  balance: number;

  @Column({ type: 'int', default: 0 })
  rating: number;

  @Column({ length: 128, nullable: true })
  profilePicture: string;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
