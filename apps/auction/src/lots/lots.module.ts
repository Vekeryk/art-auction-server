import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LotsService } from './lots.service';
import { LotsController } from './lots.controller';
import { Lot } from './entities/lot.entity';
import { LotImage } from './entities/lot-image.entity';
import { Category } from '../categories/category.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.enitity';

@Module({
  imports: [TypeOrmModule.forFeature([Lot, LotImage, Category, Comment, User])],
  providers: [LotsService],
  controllers: [LotsController],
})
export class LotsModule {}
