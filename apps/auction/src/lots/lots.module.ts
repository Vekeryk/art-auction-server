import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LotsService } from './lots.service';
import { LotsController } from './lots.controller';
import { Lot } from './lot.entity';
import { LotImage } from '../images/lot-image.entity';
import { Category } from '../categories/category.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.enitity';
import { Tag } from '../tags/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lot, LotImage, Category, Tag, Comment, User]),
  ],
  providers: [LotsService],
  controllers: [LotsController],
  exports: [LotsService],
})
export class LotsModule {}
