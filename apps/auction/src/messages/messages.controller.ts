import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { AuthUser } from '@app/common/decorators/user.decorator';
import { RequestUser } from '@app/common/types';

import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @Get()
  userDialogs(@AuthUser() user: RequestUser) {
    return this.messagesService.findLatestMessagesForUser(user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/user/:userId')
  dialog(@AuthUser() user: RequestUser, @Param('userId') userId: string) {
    return this.messagesService.findDialogMessages(user.id, userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  sendMessage(@AuthUser() user: RequestUser, @Body() dto: CreateMessageDto) {
    return this.messagesService.createMessage(user, dto);
  }
}
