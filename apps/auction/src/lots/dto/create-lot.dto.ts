import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

import {
  DealType,
  DeliveryMethod,
  Location,
  PaymentMethod,
} from '../lot.entity';

export class CreateLotDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsArray()
  @IsUUID(4, { each: true })
  tagIds: string[];

  @IsArray()
  @IsUUID(4, { each: true })
  imageIds: string[];

  @IsString()
  @IsNotEmpty()
  startTime: Date;

  @IsInt()
  @IsPositive()
  durationInDays: number;

  @IsInt()
  @IsPositive()
  startingPrice: number;

  @IsEnum(DealType)
  dealType: DealType;

  @IsArray()
  @IsEnum(PaymentMethod, { each: true })
  paymentMethods: PaymentMethod[];

  @IsArray()
  @IsEnum(DeliveryMethod, { each: true })
  deliveryMethods: DeliveryMethod[];

  @IsEnum(Location)
  location: Location;
}
