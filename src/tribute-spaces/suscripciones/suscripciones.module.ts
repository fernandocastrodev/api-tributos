import { Module } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service';
import { SuscripcionesController } from './suscripciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscripcion } from './suscripcion.entity';
import { LoggerModule } from '../../common/services/loggers/logger.module';
import { PlanesModule } from '../planes/planes.module';
import { UsuariosModule } from '../../modules/usuarios/usuarios.module';
import { FileModule } from '../../common/services/files/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suscripcion]),
    PlanesModule,
    UsuariosModule,
    LoggerModule,
    FileModule,
  ],
  controllers: [SuscripcionesController],
  providers: [SuscripcionesService],
  exports: [SuscripcionesService, TypeOrmModule],
})
export class SuscripcionesModule {}
