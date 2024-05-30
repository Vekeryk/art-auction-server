import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { AuthUser } from '@app/common/decorators/user.decorator';
import { RequestUser } from '@app/common/types';

import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(AuthGuard)
  @Get()
  userNotification(@AuthUser() user: RequestUser) {
    return this.notificationsService.findUnreadByUserId(user.id);
  }

  @UseGuards(AuthGuard)
  @Post('read')
  readNotification(@AuthUser() user: RequestUser) {
    return this.notificationsService.readUserNotifications(user.id);
  }
}
