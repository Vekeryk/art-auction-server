import { Injectable } from '@nestjs/common';
import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';

import { User } from './user.enitity';
import { UserRatingUpdateEvent } from '../events/user-rating-update.event';

@Injectable()
export class UsersService extends GenericCrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  @OnEvent('user.rating.update')
  async updateRating(payload: UserRatingUpdateEvent) {
    console.log('user.rating.update', payload);
    const { userId, newRating } = payload;
    await this.userRepository.update(
      { id: userId },
      {
        rating: newRating,
      },
    );
  }
}
