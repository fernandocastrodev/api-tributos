import { Module } from '@nestjs/common';
import { GaleriasService } from './galerias.service';
import { GaleriasController } from './galerias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Galeria } from './galeria.entity';
import { TipoGaleriasModule } from '../tipo-galerias/tipo-galerias.module';
import { TributosModule } from '../tributos/tributos.module';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Galeria]),
    TipoGaleriasModule,
    TributosModule,
  ],
  controllers: [GaleriasController],
  providers: [GaleriasService, LoggerService],
})
export class GaleriasModule {}
