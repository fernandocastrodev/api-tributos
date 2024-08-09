import { Module } from '@nestjs/common';
import { TipoGaleriasService } from './tipo-galerias.service';
import { TipoGaleriasController } from './tipo-galerias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoGaleria } from './tipo-galeria.entity';
import { LoggerModule } from '../../common/services/loggers/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([TipoGaleria]), LoggerModule],
  controllers: [TipoGaleriasController],
  providers: [TipoGaleriasService],
  exports: [TypeOrmModule, TipoGaleriasService],
})
export class TipoGaleriasModule {}
