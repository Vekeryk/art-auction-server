import { PrimaryGeneratedColumn } from 'typeorm';

export class GenericEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
