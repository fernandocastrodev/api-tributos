import { Module } from '@nestjs/common';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { LoggerModule } from '../../common/services/loggers/logger.module';
import { FileModule } from '../../common/services/files/file.module';

@Module({
  imports:[LoggerModule, FileModule],
  controllers: [QrController],
  providers: [QrService],
  exports: [QrService],
})
export class QrModule {}
