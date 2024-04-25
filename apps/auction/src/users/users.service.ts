import { Injectable } from '@nestjs/common';
import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.enitity';

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
}
