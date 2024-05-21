import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { FilterLotsDto } from './dto/filter-lots.dto';

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
}
