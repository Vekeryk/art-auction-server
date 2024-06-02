import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { BidsModule } from './bids.module';

async function bootstrap() {
  const app = await NestFactory.create(BidsModule);

  app.enableCors({
    origin: '*',
    methods: 'OPTIONS,GET,POST,PUT,DELETE',
    allowedHeaders: '*',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('bids-service');

  await app.listen(3001);
}
bootstrap();
