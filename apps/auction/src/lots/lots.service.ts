import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Lot } from './lot.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { Tag } from '../tags/tag.entity';
import { addDays } from 'date-fns';
import { LotImage } from '../images/lot-image.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class LotsService {
  constructor(
    @InjectRepository(Lot)
    private lotRepository: Repository<Lot>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(LotImage)
    private lotImageRepository: Repository<LotImage>,
  ) {}

  async createLot(createLotDto: CreateLotDto): Promise<Lot> {
    const category = await this.categoryRepository.findOneBy({
      id: createLotDto.categoryId,
    });
    const tags = await this.tagRepository.findBy({
      id: In(createLotDto.tagIds),
    });
    const lot = this.lotRepository.create({
      ...createLotDto,
      category,
      tags,
      endTime: addDays(createLotDto.startTime, createLotDto.durationInDays),
    });

    const savedLot = await this.lotRepository.save(lot);
    await this.lotImageRepository.update(
      { id: In(createLotDto.imageIds) },
      { lot: savedLot },
    );
    return savedLot;
  }
}
