import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { Repository } from 'typeorm';

import { Notification } from './notification.entity';
import { NotificationEvent } from '../events/notification.event';
import { LotClosedEvent } from '../events/lot-closed.event';

@Injectable()
export class NotificationsService extends GenericCrudService<Notification> {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {
    super(notificationRepository);
  }

  public findUnreadByUserId(userId: string) {
    return this.notificationRepository.find({
      where: { userId, read: false },
      order: { createdAt: 'DESC' },
    });
  }

  public readUserNotifications(userId: string) {
    return this.notificationRepository.update(
      { userId, read: false },
      { read: true },
    );
  }

  public createNotification(userId: string, message: string) {
    return this.create({ userId, message });
  }

  @OnEvent('notification')
  async updateRating(payload: NotificationEvent) {
    console.log('notification', payload);
    await this.create(payload);
  }

  @OnEvent('lot.closed')
  async onLotClosed(payload: LotClosedEvent) {
    console.log('onLotClosed notificationService');
    await this.createNotification(
      payload.seller.id,
      `Торги за лотом ${payload.lot.title} завершено`,
    );
    if (payload.buyer) {
      await this.createNotification(
        payload.buyer.id,
        `Ви виграли лот ${payload.lot.title}. Зв'яжіться з продавцем`,
      );
    }
  }
}
