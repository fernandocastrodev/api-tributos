import { Module } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from './permiso.entity';
import { PerfilesModule } from '../perfiles/perfiles.module';
import { PaginasModule } from '../paginas/paginas.module';
import { LoggerModule } from '../../common/services/loggers/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permiso]), PerfilesModule, PaginasModule, LoggerModule],
  controllers: [PermisosController],
  providers: [PermisosService],
  exports: [PermisosService],
})
export class PermisosModule {}
