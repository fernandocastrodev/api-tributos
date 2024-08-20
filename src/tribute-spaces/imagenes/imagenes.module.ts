import { Module } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { ImagenesController } from './imagenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from './imagen.entity';
import { GaleriasModule } from '../galerias/galerias.module';
import { LoggerModule } from '../../common/services/loggers/logger.module';
import { FileModule } from '../../common/services/files/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Imagen]), 
            GaleriasModule, 
            LoggerModule, 
            FileModule,],
  controllers: [ImagenesController],
  providers: [ImagenesService],
})
export class ImagenesModule {}
