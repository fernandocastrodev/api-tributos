import { Module } from '@nestjs/common';
import { TributosService } from './tributos.service';
import { TributosController } from './tributos.controller';
import { Tributo } from './tributo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscripcionesModule } from '../suscripciones/suscripciones.module';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tributo]), SuscripcionesModule],
  controllers: [TributosController],
  providers: [TributosService, LoggerService],
})
export class TributosModule {}
