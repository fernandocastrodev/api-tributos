import { Module } from '@nestjs/common';
import { ContactosService } from './contactos.service';
import { ContactosController } from './contactos.controller';
import { Contacto } from './contacto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../common/services/loggers/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contacto]),LoggerModule],
  controllers: [ContactosController],
  providers: [ContactosService],
})
export class ContactosModule {}
