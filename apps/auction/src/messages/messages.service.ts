import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { Repository } from 'typeorm';

import { Message } from './message.entity';
import { RequestUser } from '@app/common/types';
import { CreateMessageDto } from './dto/create-message.dto';
import { UsersService } from '../users/users.service';
import { OnEvent } from '@nestjs/event-emitter';
import { LotClosedEvent } from '../events/lot-closed.event';

@Injectable()
export class MessagesService extends GenericCrudService<Message> {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly usersService: UsersService,
  ) {
    super(messageRepository);
  }

  public async findLatestMessagesForUser(userId: string): Promise<Message[]> {
    const subQuery = this.messageRepository
      .createQueryBuilder('message')
      .select('MAX(message.created_at)', 'latest')
      .addSelect('message.sender_id')
      .addSelect('message.receiver_id')
      .groupBy('message.sender_id')
      .addGroupBy('message.receiver_id')
      .where('message.sender_id = :userId OR message.receiver_id = :userId', {
        userId,
      });

    const query = this.messageRepository
      .createQueryBuilder('message')
      .innerJoin(
        `(${subQuery.getQuery()})`,
        'subquery',
        'message.created_at = subquery.latest AND ((message.sender_id = subquery.sender_id AND message.receiver_id = subquery.receiver_id) OR (message.sender_id = subquery.receiver_id AND message.receiver_id = subquery.sender_id))',
      )
      .where('message.sender_id = :userId OR message.receiver_id = :userId', {
        userId,
      })
      .leftJoinAndSelect('message.receiver', 'receiver')
      .leftJoinAndSelect('message.sender', 'sender')
      .orderBy('message.createdAt', 'DESC');

    return query.getMany();
  }

  public async findDialogMessages(userId1: string, userId2: string) {
    const person = await this.usersService.findOne(userId2);

    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .where(
        '(message.sender_id = :userId1 AND message.receiver_id = :userId2) OR (message.sender_id = :userId2 AND message.receiver_id = :userId1)',
        { userId1, userId2 },
      )
      .orderBy('message.created_at', 'ASC')
      .getMany();

    return { person, messages };
  }

  public async createUserMessage(user: RequestUser, dto: CreateMessageDto) {
    const dialogExists = await this.messageRepository.exists({
      where: [{ senderId: user.id }, { receiverId: user.id }],
    });
    if (!dialogExists) {
      throw new NotFoundException('Dialog not found!');
    }
    return this.create({ ...dto, senderId: user.id });
  }

  @OnEvent('lot.closed')
  onLotClosed(payload: LotClosedEvent) {
    console.log('onLotClosed messagesService');
    if (payload.buyer) {
      return this.create({
        message:
          'Вітаю вас виграшем лоту! Чи є у вас якісь побажання щодо доставки?',
        senderId: payload.seller.id,
        receiverId: payload.buyer.id,
      });
    }
  }
}
