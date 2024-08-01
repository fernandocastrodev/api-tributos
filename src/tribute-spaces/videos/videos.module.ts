import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './video.entity';
import { GaleriasModule } from '../galerias/galerias.module';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), GaleriasModule],
  controllers: [VideosController],
  providers: [VideosService, LoggerService],
})
export class VideosModule {}
