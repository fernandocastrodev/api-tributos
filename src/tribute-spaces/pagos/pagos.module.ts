import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { SuscripcionesModule } from '../suscripciones/suscripciones.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './pago.entity';
import { LoggerModule } from '../../common/services/loggers/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pago]), SuscripcionesModule, LoggerModule],
  controllers: [PagosController],
  providers: [PagosService],
})
export class PagosModule {}
