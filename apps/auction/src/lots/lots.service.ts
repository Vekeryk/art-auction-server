import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { ILike, In, Repository } from 'typeorm';
import { addDays } from 'date-fns';

import { Lot } from './lot.entity';
import { Tag } from '../tags/tag.entity';
import { LotImage } from '../images/lot-image.entity';
import { Category } from '../categories/category.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { FilterLotsDto } from './dto/filter-lots.dto';

@Injectable()
export class LotsService extends GenericCrudService<Lot> {
  constructor(
    @InjectRepository(Lot)
    private lotRepository: Repository<Lot>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(LotImage)
    private lotImageRepository: Repository<LotImage>,
  ) {
    super(lotRepository);
  }

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

  findByTitle(title: string) {
    return this.lotRepository.find({
      select: { id: true, title: true },
      where: { title: ILike(`%${title}%`) },
      take: 20,
    });
  }

  async findByFilters(filterLotsDto: FilterLotsDto) {
    const { categoryId, tagIds, location, page, limit } = filterLotsDto;

    let query = this.lotRepository
      .createQueryBuilder('lot')
      .leftJoinAndSelect('lot.images', 'images')
      .leftJoinAndSelect('lot.tags', 'tag')
      .leftJoinAndSelect('lot.category', 'category');

    if (categoryId) {
      query = query.andWhere('lot.categoryId = :categoryId', { categoryId });
    }
    if (tagIds && tagIds.length > 0) {
      query = query.andWhere('tag.id IN (:...tagIds)', { tagIds });
    }
    if (location) {
      query = query.andWhere('lot.location = :location', { location });
    }

    const [lots, count] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('lot.endTime', 'ASC')
      .getManyAndCount();
    return { lots, count };
  }
}
