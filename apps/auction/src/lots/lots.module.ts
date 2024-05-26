import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LotsService } from './lots.service';
import { LotsController } from './lots.controller';
import { Lot } from './lot.entity';
import { LotImage } from '../images/lot-image.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.enitity';
import { CategoriesModule } from '../categories/categories.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lot, LotImage, Comment, User]),
    CategoriesModule,
    TagsModule,
  ],
  providers: [LotsService],
  controllers: [LotsController],
  exports: [LotsService],
})
export class LotsModule {}
