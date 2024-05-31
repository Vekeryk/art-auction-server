import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { ILike, In, LessThan, Repository } from 'typeorm';
import { addDays } from 'date-fns';

import { Lot, LotStatus } from './lot.entity';
import { LotImage } from '../images/lot-image.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { FilterLotsDto } from './dto/filter-lots.dto';
import { PlacedBidDto } from './dto/placed-bid.dto';
import { RequestUser, UserRole } from '@app/common/types';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TagsService } from '../tags/tags.service';
import { CategoriesService } from '../categories/categories.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LotClosedEvent } from '../events/lot-closed.event';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class LotsService extends GenericCrudService<Lot> {
  constructor(
    @InjectRepository(Lot)
    private lotRepository: Repository<Lot>,
    @InjectRepository(LotImage)
    private lotImageRepository: Repository<LotImage>,
    private categoriesService: CategoriesService,
    private tagsService: TagsService,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
    private eventEmitter: EventEmitter2,
  ) {
    super(lotRepository);
  }

  async createLot(user: RequestUser, dto: CreateLotDto): Promise<Lot> {
    const category = await this.categoriesService.findOne(dto.categoryId);
    const tags = await this.tagsService.findByIds(dto.tagIds);
    const lot = this.lotRepository.create({
      ...dto,
      userId: user.id,
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
    await this.usersService.decrementRating(lot.user);
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
      .where("lot.status = 'ACTIVE'")
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
    await this.lotRepository.update(
      { id: lotId },
      { currentPrice: amount, leaderId: userId },
    );
    if (lot.leaderId) {
      await this.notificationsService.createNotification(
        lot.leaderId,
        `Вашу ставку на лот ${lot.title} було перебито`,
      );
    }
    await this.notificationsService.createNotification(
      lot.userId,
      `Отримано нову ставку на лот ${lot.title}`,
    );
  }

  public findByUserId(user: RequestUser, userId: string) {
    return this.lotRepository.find({
      where: {
        userId,
        status: userId === user.id ? LotStatus.ACTIVE : undefined,
      },
      order: { endTime: 'DESC' },
    });
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async processClosedLots() {
    const now = new Date();
    const finishedLots = await this.lotRepository.findBy({
      endTime: LessThan(now),
      status: LotStatus.ACTIVE,
    });
    for (const lot of finishedLots) {
      lot.status = LotStatus.CLOSED;
      const { user: seller, leader: buyer } = lot;
      this.eventEmitter.emit(
        'lot.closed',
        new LotClosedEvent(lot, seller, buyer),
      );
    }
    await this.lotRepository.save(finishedLots);
  }
}
