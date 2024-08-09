import { Module } from '@nestjs/common';
import { TributosService } from './tributos.service';
import { TributosController } from './tributos.controller';
import { Tributo } from './tributo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscripcionesModule } from '../suscripciones/suscripciones.module';
import { LoggerModule } from '../../common/services/loggers/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tributo]), SuscripcionesModule, LoggerModule],
  controllers: [TributosController],
  providers: [TributosService],
  exports: [TypeOrmModule, TributosService],
})
export class TributosModule {}
