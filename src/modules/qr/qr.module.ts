import { Module } from '@nestjs/common';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  controllers: [QrController],
  providers: [QrService, LoggerService],
})
export class QrModule {}
