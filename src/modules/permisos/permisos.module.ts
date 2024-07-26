import { Module } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from './permiso.entity';
import { PerfilesModule } from '../perfiles/perfiles.module';
import { PaginasModule } from '../paginas/paginas.module';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permiso]), PerfilesModule, PaginasModule],
  controllers: [PermisosController],
  providers: [PermisosService, LoggerService],
  exports: [PermisosService],
})
export class PermisosModule {}
