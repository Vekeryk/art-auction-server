import { Injectable } from '@nestjs/common';
import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';

import { User } from './user.enitity';
import { LotClosedEvent } from '../events/lot-closed.event';

@Injectable()
export class UsersService extends GenericCrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  public async incrementRating(user: User) {
    user.rating = user.rating + 1;
    await this.userRepository.save(user);
  }

  public async decrementRating(user: User) {
    user.rating = user.rating - 1;
    await this.userRepository.save(user);
  }

  @OnEvent('lot.closed')
  async onLotClosed(payload: LotClosedEvent) {
    console.log('onClosedLot usersService');
    if (payload.buyer) {
      await this.incrementRating(payload.seller);
      await this.incrementRating(payload.buyer);
    }
  }
}
