import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Lot } from './entities/lot.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { Tag } from '../tags/tag.entity';

@Injectable()
export class LotsService {
  constructor(
    @InjectRepository(Lot)
    private lotRepository: Repository<Lot>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async createLot(createLotDto: CreateLotDto): Promise<Lot> {
    const tags = await this.tagRepository.findBy({ id: In(createLotDto.tags) });
    const lot = this.lotRepository.create({ ...createLotDto, tags });
    return this.lotRepository.save(lot);
  }
}
