import { Injectable } from '@nestjs/common';
import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comment.entity';
import { MessageDto } from '@app/common/dto/message.dto';
import { UsersService } from '../users/users.service';
import { LotsService } from '../lots/lots.service';
import { RequestUser } from '@app/common/types';

@Injectable()
export class CommentsService extends GenericCrudService<Comment> {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private usersService: UsersService,
    private lotsService: LotsService,
  ) {
    super(commentRepository);
  }

  async createComment(requestUser: RequestUser, messageDto: MessageDto) {
    const lot = await this.lotsService.findOne(messageDto.lotId);
    const user = await this.usersService.findOne(requestUser.id);
    console.log(lot, user);
    return this.create({ ...messageDto, lot, user });
  }
}
