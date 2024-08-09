import { Module } from '@nestjs/common';
import { PlantillasService } from './plantillas.service';
import { PlantillasController } from './plantillas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plantilla } from './plantilla.entity';
import { LoggerModule } from '../../common/services/loggers/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plantilla]), LoggerModule],
  controllers: [PlantillasController],
  providers: [PlantillasService],
  exports: [PlantillasService, TypeOrmModule],
})
export class PlantillasModule {}
