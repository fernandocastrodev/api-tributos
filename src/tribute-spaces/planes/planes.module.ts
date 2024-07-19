import { Module } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { PlanesController } from './planes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlanesController],
  providers: [PlanesService, LoggerService],
  exports: [PlanesService, TypeOrmModule],
})
export class PlanesModule {}
