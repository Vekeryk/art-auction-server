import { Injectable } from '@nestjs/common';

@Injectable()
export class BidsService {
  getHello(): string {
    return 'Hello World!';
  }
}
