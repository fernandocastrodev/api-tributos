import { Module } from '@nestjs/common';
import { PaginasService } from './paginas.service';
import { PaginasController } from './paginas.controller';
import { Pagina } from './pagina.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../common/services/loggers/logger.module';
import { Permiso } from '../permisos/permiso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pagina, Permiso]), LoggerModule],
  controllers: [PaginasController],
  providers: [PaginasService],
  exports: [TypeOrmModule, PaginasService],
})
export class PaginasModule {}
