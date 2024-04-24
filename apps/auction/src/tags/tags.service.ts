import { Injectable } from '@nestjs/common';
import { GenericCrudService } from '@app/common/generic-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from './tag.entity';

@Injectable()
export class TagsService extends GenericCrudService<Tag> {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {
    super(tagRepository);
  }
}
