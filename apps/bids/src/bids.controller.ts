import { Controller, Get, Param } from '@nestjs/common';

import { BidsService } from './bids.service';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Get('lot/:lotId')
  lotBids(@Param('lotId') lotId: string) {
    return this.bidsService.findAllByLotId(lotId);
  }
}
