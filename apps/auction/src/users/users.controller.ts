import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IdsDto } from '@app/common/dto/ids.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async getByIds(@Body() dto: IdsDto) {
    return this.usersService.findByIds(dto.ids);
  }
}
