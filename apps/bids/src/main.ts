import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { BidsModule } from './bids.module';

async function bootstrap() {
  const app = await NestFactory.create(BidsModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3001);
}
bootstrap();
