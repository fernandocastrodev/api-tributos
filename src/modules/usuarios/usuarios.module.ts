import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { PerfilesModule } from '../perfiles/perfiles.module';
import { PerfilesService } from '../perfiles/perfiles.service';
import { LoggerModule } from '../../common/services/loggers/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), PerfilesModule, LoggerModule],
  controllers: [UsuariosController],
  providers: [UsuariosService, PerfilesService],
  exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}
