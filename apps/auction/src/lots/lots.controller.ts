import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lot.dto';

@Controller('lots')
export class LotsController {
  constructor(private lotsService: LotsService) {}

  @Post()
  create(@Body() createLotDto: CreateLotDto) {
    return this.lotsService.createLot(createLotDto);
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.lotsService.findOne(id);
  }

  @Get()
  all() {
    return this.lotsService.findAll();
  }
}
