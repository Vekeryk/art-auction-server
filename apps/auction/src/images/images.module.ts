import { Module } from '@nestjs/common';

import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { LotImage } from './lot-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LotImage]),
    MulterModule.register({
      dest: './upload',
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const filename: string = uuidv4();
          const extension: string = extname(file.originalname);
          callback(null, `${filename}${extension}`);
        },
      }),
    }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
