import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailProvider } from './mail.provider';
import { LoggerModule } from '../../common/services/loggers/logger.module';
import { PlantillasModule } from '../../tribute-spaces/plantillas/plantillas.module';
import { PlantillasService } from '../../tribute-spaces/plantillas/plantillas.service';

@Module({
  imports: [ConfigModule, PlantillasModule, LoggerModule],
  controllers: [MailController],
  providers: [MailService, MailProvider, PlantillasService],
  exports: [MailService, MailProvider],
})
export class MailModule {}
