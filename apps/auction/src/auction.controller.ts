import { Controller, Get } from '@nestjs/common';
import { AuctionService } from './auction.service';

@Controller()
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Get('health')
  health() {
    return 'OK';
  }
}
