import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestUser } from '@app/common/types';
import { UsersService } from './users.service';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    console.log('User intercepted');
    const request = context.switchToHttp().getRequest();
    const user: RequestUser = request.user;
    console.log(user);
    if (user) {
      console.log(user.id);
      const dbUser = await this.usersService.findOne(user.id);
      console.log(dbUser);
      if (!dbUser) {
        const createdUser = await this.usersService.create({
          ...user,
          username: user.username.split('@')[0].replaceAll('.', ''),
          passwordHash: '123',
          rating: Math.floor(Math.random() * 100),
        });
        user.id = createdUser.id;
      }
      console.log(user.id);
    }
    return next.handle();
  }
}
