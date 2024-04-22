import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuctionService {
  constructor(private readonly configService: ConfigService) {
    console.log(configService.get<string>('DB_PASSWORD'));
  }
  getHello(): string {
    return 'Hello World!';
  }
}
