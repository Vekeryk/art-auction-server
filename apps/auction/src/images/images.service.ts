import { Injectable } from '@nestjs/common';
import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LotImage } from './lot-image.entity';

@Injectable()
export class ImagesService extends GenericCrudService<LotImage> {
  constructor(
    @InjectRepository(LotImage)
    private lotImageRepository: Repository<LotImage>,
  ) {
    super(lotImageRepository);
  }
}
