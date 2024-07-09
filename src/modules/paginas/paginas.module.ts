import { Module } from '@nestjs/common';
import { PaginasService } from './paginas.service';
import { PaginasController } from './paginas.controller';
import { Pagina } from './pagina.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pagina])],
  controllers: [PaginasController],
  providers: [PaginasService, LoggerService],
  exports: [TypeOrmModule],
})
export class PaginasModule {}
