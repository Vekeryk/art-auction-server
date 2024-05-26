import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';
import { UsersModule } from '../users/users.module';
import { LotsModule } from '../lots/lots.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), UsersModule, LotsModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
