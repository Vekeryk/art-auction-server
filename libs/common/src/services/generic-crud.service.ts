import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class GenericCrudService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}

  findAll(): Promise<T[]> {
    return this.genericRepository.find();
  }

  findOne(id: string): Promise<T> {
    return this.genericRepository.findOneById(id);
  }

  create(entityLike: DeepPartial<T>): Promise<T> {
    const entity = this.genericRepository.create(entityLike);
    return this.genericRepository.save(entity);
  }

  async update(id: string, updateDto: any): Promise<T> {
    const entity = await this.genericRepository.preload({
      id: id,
      ...updateDto,
    });
    if (!entity) {
      throw new Error('Entity not found');
    }
    return this.genericRepository.save(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.genericRepository.remove(entity);
  }
}
