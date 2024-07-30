import { Module } from '@nestjs/common';
import { TipoGaleriasService } from './tipo-galerias.service';
import { TipoGaleriasController } from './tipo-galerias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoGaleria } from './tipo-galeria.entity';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoGaleria])],
  controllers: [TipoGaleriasController],
  providers: [TipoGaleriasService, LoggerService],
  exports: [TypeOrmModule, TipoGaleriasService],
})
export class TipoGaleriasModule {}
