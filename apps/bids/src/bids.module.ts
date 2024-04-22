import { Module } from '@nestjs/common';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';

@Module({
  imports: [],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
