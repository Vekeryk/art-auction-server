import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { FilterLotsDto } from './dto/filter-lots.dto';
import { BidDto } from './dto/bid.dto';

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

  @Get()
  filterLots(@Query() filterLotsDto: FilterLotsDto) {
    if (filterLotsDto.title) {
      return this.lotsService.findByTitle(filterLotsDto.title);
    }
    return this.lotsService.findByFilters(filterLotsDto);
  }

  @EventPattern('bid-placed')
  handleBidPlaced(@Payload() bid: BidDto) {
    return this.lotsService.processBid(bid);
  }
}
