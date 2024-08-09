import { Module } from '@nestjs/common';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { LoggerModule } from '../../common/services/loggers/logger.module';

@Module({
  imports:[LoggerModule],
  controllers: [QrController],
  providers: [QrService],
})
export class QrModule {}
