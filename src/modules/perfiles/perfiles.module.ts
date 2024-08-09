import { forwardRef, Module } from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { PerfilesController } from './perfiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfil } from './perfil.entity';
import { LoggerModule } from '../../common/services/loggers/logger.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../usuarios/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Perfil, Usuario]),
    forwardRef(() => UsuariosModule),
    LoggerModule,
  ],
  controllers: [PerfilesController],
  providers: [PerfilesService, UsuariosService],
  exports: [PerfilesService, TypeOrmModule],
})
export class PerfilesModule {}
