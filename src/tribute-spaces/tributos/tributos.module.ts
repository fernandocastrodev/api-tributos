import { forwardRef, Module } from '@nestjs/common';
import { TributosService } from './tributos.service';
import { TributosController } from './tributos.controller';
import { Tributo } from './tributo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscripcionesModule } from '../suscripciones/suscripciones.module';
import { LoggerModule } from '../../common/services/loggers/logger.module';
import { GaleriasModule } from '../galerias/galerias.module';
import { Galeria } from '../galerias/galeria.entity';
import { Imagen } from '../imagenes/imagen.entity';
import { ImagenesModule } from '../imagenes/imagenes.module';
import { TextosModule } from '../textos/textos.module';
import { VideosModule } from '../videos/videos.module';
import { Texto } from '../textos/texto.entity';
import { Video } from '../videos/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tributo, Galeria, Imagen, Texto, Video]), SuscripcionesModule, forwardRef(() => GaleriasModule), ImagenesModule, TextosModule, VideosModule, LoggerModule],
  controllers: [TributosController],
  providers: [TributosService],
  exports: [TypeOrmModule, TributosService],
})
export class TributosModule {}
