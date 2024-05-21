import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { Location } from '../lot.entity';

export class FilterLotsDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsArray()
  @IsOptional()
  @IsUUID(4, { each: true })
  tagIds?: string[];

  @IsEnum(Location)
  @IsOptional()
  location?: Location;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;
}
