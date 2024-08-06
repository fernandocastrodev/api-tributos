import { Module } from '@nestjs/common';
import { PlantillasService } from './plantillas.service';
import { PlantillasController } from './plantillas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plantilla } from './plantilla.entity';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plantilla])],
  controllers: [PlantillasController],
  providers: [PlantillasService, LoggerService],
  exports: [PlantillasService, TypeOrmModule],
})
export class PlantillasModule {}
