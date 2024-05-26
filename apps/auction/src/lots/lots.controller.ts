import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { FilterLotsDto } from './dto/filter-lots.dto';
import { PlacedBidDto } from './dto/placed-bid.dto';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { AuthUser } from '@app/common/decorators/user.decorator';
import { RequestUser } from '@app/common/types';

@Controller('lots')
export class LotsController {
  constructor(private lotsService: LotsService) {}

  @Post()
  create(@Body() createLotDto: CreateLotDto) {
    return this.lotsService.createLot(createLotDto);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.lotsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/withdraw')
  withdrawLot(@AuthUser() user: RequestUser, @Param('id') id: string) {
    return this.lotsService.withdrawLot(user, id);
  }

  @UseGuards(AuthGuard)
  @Get()
  filterLots(@Query() filterLotsDto: FilterLotsDto) {
    if (filterLotsDto.title) {
      return this.lotsService.findByTitle(filterLotsDto.title);
    }
    return this.lotsService.findByFilters(filterLotsDto);
  }

  @EventPattern('bid-placed')
  handleBidPlaced(@Payload() dto: PlacedBidDto) {
    console.log(dto);
    return this.lotsService.handlePlacedBid(dto);
  }
}
