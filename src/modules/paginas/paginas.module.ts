import { Module } from '@nestjs/common';
import { PaginasService } from './paginas.service';
import { PaginasController } from './paginas.controller';
import { Pagina } from './pagina.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from '../../common/services/logger.service';
import { Permiso } from '../permisos/permiso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pagina, Permiso])],
  controllers: [PaginasController],
  providers: [PaginasService, LoggerService],
  exports: [TypeOrmModule, PaginasService],
})
export class PaginasModule {}
