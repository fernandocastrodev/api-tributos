import { Module } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { ImagenesController } from './imagenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from './imagen.entity';
import { GaleriasModule } from '../galerias/galerias.module';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Imagen]), GaleriasModule],
  controllers: [ImagenesController],
  providers: [ImagenesService, LoggerService],
})
export class ImagenesModule {}
