import { Module } from '@nestjs/common';
import { TextosService } from './textos.service';
import { TextosController } from './textos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Texto } from './texto.entity';
import { GaleriasModule } from '../galerias/galerias.module';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Texto]), GaleriasModule],
  controllers: [TextosController],
  providers: [TextosService, LoggerService],
})
export class TextosModule {}
