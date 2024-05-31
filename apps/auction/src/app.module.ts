import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { LotsModule } from './lots/lots.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CategoriesModule } from './categories/categories.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';
import { TagsModule } from './tags/tags.module';
import { ReportsModule } from './reports/reports.module';
import { ImagesModule } from './images/images.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auction/.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      // synchronize: true,
      // logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    LotsModule,
    UsersModule,
    CommentsModule,
    CategoriesModule,
    NotificationsModule,
    MessagesModule,
    TagsModule,
    ReportsModule,
    ImagesModule,
  ],
  controllers: [AuctionController],
  providers: [AuctionService],
})
export class AppModule {}
