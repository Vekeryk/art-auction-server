import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsInt,
  IsEnum,
  IsArray,
} from 'class-validator';

import {
  DealType,
  DeliveryMethod,
  PaymentMethod,
  Location,
} from '../entities/lot.entity';

export class CreateLotDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  startTime: Date;

  @IsString()
  @IsOptional()
  endTime?: Date;

  @IsInt()
  startingPrice: number;

  @IsInt()
  @IsOptional()
  currentPrice?: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

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

  @IsArray()
  @IsUUID(4, { each: true })
  tags: string[];
}
