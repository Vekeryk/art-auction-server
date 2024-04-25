import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { UsersModule } from '../users/users.module';
import { LotsModule } from '../lots/lots.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule, LotsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
