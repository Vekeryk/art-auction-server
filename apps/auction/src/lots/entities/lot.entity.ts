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

import { Category } from '../../categories/category.entity';
import { Comment } from '../../comments/comment.entity';
import { Tag } from '../../tags/tag.entity';
import { User } from '../../users/user.enitity';

export enum LotStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  CLOSED = 'closed',
}

export enum PaymentMethod {
  CASH_ON_MEETING = 'CASH_ON_MEETING',
  BY_AGREEMENT = 'BY_AGREEMENT',
  ONLINE_TRANSFER = 'ONLINE_TRANSFER',
  PAY_TO_COURIER = 'PAY_TO_COURIER',
  STANDARD_BANK_TRANSFER = 'STANDARD_BANK_TRANSFER',
}

export enum DeliveryMethod {
  BY_AGREEMENT = 'BY_AGREEMENT',
  COURIER_SERVICE = 'COURIER_SERVICE',
  NOVA_POST = 'NOVA_POST',
  PERSONAL_MEETING = 'PERSONAL_MEETING',
  MAIL_PACKAGE = 'MAIL_PACKAGE',
  VALUABLE_MAIL_PACKAGE = 'VALUABLE_MAIL_PACKAGE',
  PICKUP = 'PICKUP',
  UKR_POST = 'UKR_POST',
}

export enum Location {
  KYIV = 'Kyiv',
  ODESA = 'Odesa',
  KHARKIV = 'Kharkiv',
  DNIPRO = 'Dnipro',
  ZAPORIZHZHIA = 'Zaporizhzhia',
  IVANO_FRANKIVSK = 'Ivano-Frankivsk',
  CHERKASY = 'Cherkasy',
  CHERNIVTSI = 'Chernivtsi',
  KHERSON = 'Kherson',
  KHMELNYTSKYI = 'Khmelnytskyi',
  LUHANSK = 'Luhansk',
  MYKOLAIV = 'Mykolaiv',
  POLTAVA = 'Poltava',
  RIVNE = 'Rivne',
  SUMY = 'Sumy',
  TERNOPIL = 'Ternopil',
  VINNYTSIA = 'Vinnytsia',
  VOLYN = 'Volyn',
  ZAKARPATTIA = 'Zakarpattia',
  ZHYTOMYR = 'Zhytomyr',
  KROPYVNYTSKYI = 'Kropyvnytskyi',
  DONETSK = 'Donetsk',
}

export enum DealType {
  PREPAYMENT = 'prepayment',
  CASH_ON_DELIVERY = 'cod',
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
