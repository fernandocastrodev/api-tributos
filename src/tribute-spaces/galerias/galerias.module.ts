import { Module } from '@nestjs/common';
import { GaleriasService } from './galerias.service';
import { GaleriasController } from './galerias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Galeria } from './galeria.entity';
import { TipoGaleriasModule } from '../tipo-galerias/tipo-galerias.module';
import { TributosModule } from '../tributos/tributos.module';
import { LoggerModule } from '../../common/services/loggers/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Galeria]),
    TipoGaleriasModule,
    TributosModule,
    LoggerModule,
  ],
  controllers: [GaleriasController],
  providers: [GaleriasService],
  exports: [TypeOrmModule],
})
export class GaleriasModule {}
