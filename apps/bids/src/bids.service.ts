import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { RequestUser } from '@app/common/types';
import { GenericCrudService } from '@app/common/services/generic-crud.service';
import { Repository } from 'typeorm';

import { Bid } from './bid.entity';
import { PlaceBidDto } from './dto/place-bid.dto';

@Injectable()
export class BidsService extends GenericCrudService<Bid> {
  constructor(
    @InjectRepository(Bid)
    private bidRepository: Repository<Bid>,
    @Inject('BIDS_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {
    super(bidRepository);
  }

  public findAllByLotId(lotId: string) {
    return this.bidRepository.find({
      where: { lotId },
      order: { createdAt: 'DESC' },
    });
  }

  async placeBid(user: RequestUser, placeBidDto: PlaceBidDto) {
    const lastBid = await this.bidRepository.findOne({
      where: { lotId: placeBidDto.lotId },
      order: { createdAt: 'DESC' },
    });
    if (lastBid && placeBidDto.amount <= lastBid.amount) {
      throw new BadRequestException(
        'The bid amount must be higher than the current price.',
      );
    }
    const placedBid = await this.create({ ...placeBidDto, userId: user.id });
    this.rabbitClient.emit('bid-placed', placedBid);
    return placedBid;
  }
}
