import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class PlaceBidDto {
  @IsUUID()
  @IsNotEmpty()
  lotId: string;

  @IsInt()
  @IsPositive()
  amount: number;
}
