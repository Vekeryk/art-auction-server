import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@app/common/guards/auth.guard';
import { AuthUser } from '@app/common/decorators/user.decorator';
import { RequestUser } from '@app/common/types';

import { BidsService } from './bids.service';
import { PlaceBidDto } from './dto/place-bid.dto';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @UseGuards(AuthGuard)
  @Post()
  placeBid(@AuthUser() user: RequestUser, @Body() placeBidDto: PlaceBidDto) {
    return this.bidsService.placeBid(user, placeBidDto);
  }
}
