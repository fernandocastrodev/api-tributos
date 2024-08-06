import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailProvider } from './mail.provider';
import { LoggerService } from '../../common/services/logger.service';
import { PlantillasModule } from '../../tribute-spaces/plantillas/plantillas.module';
import { PlantillasService } from '../../tribute-spaces/plantillas/plantillas.service';

@Module({
  imports: [ConfigModule, PlantillasModule],
  controllers: [MailController],
  providers: [MailService, MailProvider, LoggerService, PlantillasService],
  exports: [MailService, MailProvider],
})
export class MailModule {}
