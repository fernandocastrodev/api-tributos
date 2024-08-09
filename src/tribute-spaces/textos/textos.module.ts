import { Module } from '@nestjs/common';
import { TextosService } from './textos.service';
import { TextosController } from './textos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Texto } from './texto.entity';
import { GaleriasModule } from '../galerias/galerias.module';
import { LoggerModule } from '../../common/services/loggers/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Texto]), GaleriasModule, LoggerModule],
  controllers: [TextosController],
  providers: [TextosService],
})
export class TextosModule {}
