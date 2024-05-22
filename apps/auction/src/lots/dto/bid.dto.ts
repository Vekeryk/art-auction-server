import { IsInt, IsString, IsUUID } from 'class-validator';

export class BidDto {
  @IsUUID()
  lotId: string;
  @IsUUID()
  userId: string;
  @IsInt()
  amount: number;
  @IsString()
  createdAt: string;
}
