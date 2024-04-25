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
export class Lot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'lot_tags',
    joinColumn: {
      name: 'lot_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.lot)
  comments: Comment[];

  @Column({
    type: 'enum',
    enum: LotStatus,
    default: LotStatus.PENDING,
  })
  status: LotStatus;

  @Column({ type: 'timestamp', nullable: false })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @Column({ type: 'int', nullable: false })
  startingPrice: number;

  @Column({ type: 'int', nullable: true })
  currentPrice: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    array: true,
  })
  paymentMethods: PaymentMethod[];

  @Column({
    type: 'enum',
    enum: DeliveryMethod,
    array: true,
  })
  deliveryMethods: DeliveryMethod[];

  @Column({
    type: 'enum',
    enum: Location,
  })
  location: Location;

  @Column({
    type: 'enum',
    enum: DealType,
  })
  dealType: DealType;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
