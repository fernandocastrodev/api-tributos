import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './video.entity';
import { GaleriasModule } from '../galerias/galerias.module';
import { LoggerModule } from '../../common/services/loggers/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), GaleriasModule, LoggerModule],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
