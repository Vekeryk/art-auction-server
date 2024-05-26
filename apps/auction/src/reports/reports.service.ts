import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { Repository } from 'typeorm';

import { Report } from './report.entity';
import { RequestUser } from '@app/common/types';
import { MessageDto } from '@app/common/dto/message.dto';
import { UsersService } from '../users/users.service';
import { LotsService } from '../lots/lots.service';

@Injectable()
export class ReportsService extends GenericCrudService<Report> {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private usersService: UsersService,
    private lotsService: LotsService,
  ) {
    super(reportRepository);
  }

  async createReport(requestUser: RequestUser, messageDto: MessageDto) {
    const lot = await this.lotsService.findOne(messageDto.lotId);
    const user = await this.usersService.findOne(requestUser.id);
    return this.create({ ...messageDto, lot, user });
  }
}
