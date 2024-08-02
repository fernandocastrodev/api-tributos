import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailProvider } from './mail.provider';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [ConfigModule],
  controllers: [MailController],
  providers: [MailService, MailProvider, LoggerService],
  exports: [MailService, MailProvider],
})
export class MailModule {}
