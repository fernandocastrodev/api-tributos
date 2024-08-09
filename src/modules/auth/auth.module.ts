import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../config/jwt.config';
import { PaginasModule } from '../paginas/paginas.module';
import { MailModule } from '../../providers/mail/mail.module';
import { MailService } from '../../providers/mail/mail.service';
import { PlantillasModule } from '../../tribute-spaces/plantillas/plantillas.module';
import { EncryptionModule } from 'src/common/services/encryptions/encryption.module';

@Module({
  imports: [
    UsuariosModule,
    PaginasModule,
    MailModule,
    PlantillasModule,
    EncryptionModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService],
})
export class AuthModule {}
