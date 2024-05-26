import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { Repository } from 'typeorm';

import { Notification } from './notification.entity';
import { NotificationEvent } from '../events/notification.event';

@Injectable()
export class NotificationsService extends GenericCrudService<Notification> {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {
    super(notificationRepository);
  }

  @OnEvent('notification')
  async updateRating(payload: NotificationEvent) {
    console.log('notification', payload);
    await this.create(payload);
  }
}
