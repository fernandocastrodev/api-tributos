import { Module } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service';
import { SuscripcionesController } from './suscripciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscripcion } from './suscripcion.entity';
import { LoggerService } from '../../common/services/logger.service';
import { PlanesModule } from '../planes/planes.module';
import { UsuariosModule } from '../../modules/usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suscripcion]),
    PlanesModule,
    UsuariosModule,
  ],
  controllers: [SuscripcionesController],
  providers: [SuscripcionesService, LoggerService],
  exports: [SuscripcionesService],
})
export class SuscripcionesModule {}
