import { Body, Controller, Post } from '@nestjs/common';

import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lot.dto';

@Controller('lots')
export class LotsController {
  constructor(private lotsService: LotsService) {}

  @Post()
  createLot(@Body() createLotDto: CreateLotDto) {
    return this.lotsService.createLot(createLotDto);
  }
}
