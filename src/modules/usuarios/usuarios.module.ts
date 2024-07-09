import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { PerfilesModule } from '../perfiles/perfiles.module';
import { PerfilesService } from '../perfiles/perfiles.service';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), PerfilesModule],
  controllers: [UsuariosController],
  providers: [UsuariosService, PerfilesService, LoggerService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
