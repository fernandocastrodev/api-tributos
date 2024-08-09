import { Module } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { PlanesController } from './planes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { LoggerModule } from '../../common/services/loggers/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), LoggerModule],
  controllers: [PlanesController],
  providers: [PlanesService],
  exports: [PlanesService, TypeOrmModule],
})
export class PlanesModule {}
