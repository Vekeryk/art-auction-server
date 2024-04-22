import { Controller, Get } from '@nestjs/common';
import { BidsService } from './bids.service';

@Controller()
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Get()
  getHello(): string {
    return this.bidsService.getHello();
  }
}
