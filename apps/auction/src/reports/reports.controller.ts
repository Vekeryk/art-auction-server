import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { AuthUser } from '@app/common/decorators/user.decorator';
import { RequestUser } from '@app/common/types';
import { MessageDto } from '@app/common/dto/message.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@AuthUser() user: RequestUser, @Body() messageDto: MessageDto) {
    return this.reportsService.createReport(user, messageDto);
  }
}
