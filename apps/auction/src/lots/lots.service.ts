import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { ILike, In, Repository } from 'typeorm';
import { addDays } from 'date-fns';

import { Lot, LotStatus } from './lot.entity';
import { LotImage } from '../images/lot-image.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { FilterLotsDto } from './dto/filter-lots.dto';
import { PlacedBidDto } from './dto/placed-bid.dto';
import { RequestUser, UserRole } from '@app/common/types';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationEvent } from '../events/notification.event';
import { TagsService } from '../tags/tags.service';
import { CategoriesService } from '../categories/categories.service';
import { UserRatingUpdateEvent } from '../events/user-rating-update.event';

@Injectable()
export class LotsService extends GenericCrudService<Lot> {
  constructor(
    @InjectRepository(Lot)
    private lotRepository: Repository<Lot>,
    private categoriesService: CategoriesService,
    private tagsService: TagsService,
    @InjectRepository(LotImage)
    private lotImageRepository: Repository<LotImage>,
    private eventEmitter: EventEmitter2,
  ) {
    super(lotRepository);
  }

  async createLot(dto: CreateLotDto): Promise<Lot> {
    const category = await this.categoriesService.findOne(dto.categoryId);
    const tags = await this.tagsService.findByIds(dto.tagIds);
    const lot = this.lotRepository.create({
      ...dto,
      category,
      tags,
      endTime: addDays(dto.startTime, dto.durationInDays),
    });

    const savedLot = await this.lotRepository.save(lot);
    await this.lotImageRepository.update(
      { id: In(dto.imageIds) },
      { lot: savedLot },
    );
    return savedLot;
  }

  async withdrawLot(user: RequestUser, id: string) {
    const lot = await this.findOne(id);
    if (!lot || lot.status !== LotStatus.ACTIVE) {
      throw new NotFoundException('Active lot not found');
    }
    if (lot.user.role !== UserRole.MODERATOR && lot.user.id !== user.id) {
      throw new ForbiddenException('You have no access');
    }
    lot.status = LotStatus.INACTIVE;
    await this.lotRepository.save(lot);
    this.eventEmitter.emit(
      'user.rating.update',
      new UserRatingUpdateEvent(lot.user.id, lot.user.rating - 1),
    );
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

  async handlePlacedBid(placedBidDto: PlacedBidDto) {
    const { lotId, userId, amount } = placedBidDto;
    const lot = await this.findOne(lotId);
    console.log(placedBidDto);
    await this.lotRepository.update(
      { id: lotId },
      { currentPrice: amount, leaderId: userId },
    );
    if (lot.leader) {
      this.eventEmitter.emit(
        'notification',
        new NotificationEvent(
          lot.leader.id,
          `Вашу ставку на лот ${lot.title} перебито`,
        ),
      );
    }
    this.eventEmitter.emit(
      'notification',
      new NotificationEvent(
        lot.user.id,
        `Отримано нову ставку на лот ${lot.title}`,
      ),
    );
  }
}
