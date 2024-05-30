import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '../categories/category.entity';
import { Comment } from '../comments/comment.entity';
import { Tag } from '../tags/tag.entity';
import { User } from '../users/user.enitity';
import { GenericEntity } from '@app/common/generic-entity';
import { LotImage } from '../images/lot-image.entity';

export enum LotStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH_ON_MEETING = 'CASH_ON_MEETING',
  PAY_TO_COURIER = 'PAY_TO_COURIER',
  BY_AGREEMENT = 'BY_AGREEMENT',
}

export enum DeliveryMethod {
  NOVA_POST = 'NOVA_POST',
  UKR_POST = 'UKR_POST',
  COURIER_SERVICE = 'COURIER_SERVICE',
  PERSONAL_MEETING = 'PERSONAL_MEETING',
  BY_AGREEMENT = 'BY_AGREEMENT',
}

export enum Location {
  KYIV = 'KYIV',
  ODESA = 'ODESA',
  KHARKIV = 'KHARKIV',
  DNIPRO = 'DNIPRO',
  ZAPORIZHZHIA = 'ZAPORIZHZHIA',
  IVANO_FRANKIVSK = 'IVANO_FRANKIVSK',
  CHERKASY = 'CHERKASY',
  CHERNIVTSI = 'CHERNIVTSI',
  KHERSON = 'KHERSON',
  KHMELNYTSKYI = 'KHMELNYTSKYI',
  LUHANSK = 'LUHANSK',
  MYKOLAIV = 'MYKOLAIV',
  POLTAVA = 'POLTAVA',
  RIVNE = 'RIVNE',
  SUMY = 'SUMY',
  TERNOPIL = 'TERNOPIL',
  VINNYTSIA = 'VINNYTSIA',
  VOLYN = 'VOLYN',
  ZAKARPATTIA = 'ZAKARPATTIA',
  ZHYTOMYR = 'ZHYTOMYR',
  KROPYVNYTSKYI = 'KROPYVNYTSKYI',
  DONETSK = 'DONETSK',
}

export enum DealType {
  PREPAYMENT = 'PREPAYMENT',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

@Entity()
export class Lot extends GenericEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  categoryId: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'leader_id' })
  leader: User;

  @Column({ nullable: true })
  leaderId: string;

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable({
    name: 'lot_tags',
    joinColumn: { name: 'lot_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.lot, { eager: true })
  comments: Comment[];

  @OneToMany(() => LotImage, (lotImage) => lotImage.lot, { eager: true })
  images: LotImage[];

  @Column({ type: 'enum', enum: LotStatus, default: LotStatus.PENDING })
  status: LotStatus;

  @Column({ type: 'timestamp', nullable: false })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @Column({ type: 'int', nullable: false })
  startingPrice: number;

  @Column({ type: 'int', nullable: true })
  currentPrice: number;

  @Column({ type: 'enum', enum: PaymentMethod, array: true })
  paymentMethods: PaymentMethod[];

  @Column({ type: 'enum', enum: DeliveryMethod, array: true })
  deliveryMethods: DeliveryMethod[];

  @Column({ type: 'enum', enum: Location })
  location: Location;

  @Column({ type: 'enum', enum: DealType })
  dealType: DealType;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
