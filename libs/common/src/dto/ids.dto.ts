import { IsArray, IsUUID } from 'class-validator';

export class IdsDto {
  @IsArray()
  @IsUUID('4', { each: true })
  ids: string[];
}
