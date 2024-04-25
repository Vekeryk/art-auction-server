import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { MessageDto } from '@app/common/dto/message.dto';
import { AuthUser } from '@app/common/decorators/user.decorator';
import { RequestUser } from '@app/common/types';
import { AuthGuard } from '@app/common/guards/auth.guard';

import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@AuthUser() user: RequestUser, @Body() messageDto: MessageDto) {
    return this.commentsService.createComment(user, messageDto);
  }
}
