import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';
import { createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';

import { AppModule } from './app.module';

async function bootstrap() {
  const agent = createAgent({
    authSecret: process.env.FOREST_AUTH_SECRET,
    envSecret: process.env.FOREST_ENV_SECRET,
    isProduction: process.env.NODE_ENV === 'production',
    typingsPath: './typings.ts',
    typingsMaxDepth: 5,
  }).addDataSource(createSqlDataSource(process.env.DATABASE_URL));

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // await agent.mountOnNestJs(app).start();

  app.useStaticAssets(join(__dirname, '../../..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'OPTIONS,GET,POST,PUT,DELETE',
    allowedHeaders: '*',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
