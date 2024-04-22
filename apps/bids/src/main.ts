import { NestFactory } from '@nestjs/core';
import { BidsModule } from './bids.module';

async function bootstrap() {
  const app = await NestFactory.create(BidsModule);
  await app.listen(3000);
}
bootstrap();
