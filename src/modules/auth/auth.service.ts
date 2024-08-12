import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { PaginasService } from '../paginas/paginas.service';
import { MailService } from '../../providers/mail/mail.service';
import { EncryptionService } from '../../common/services/encryptions/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly paginasService: PaginasService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async login({ correo, claveAcceso }: LoginDto) {
    const usuario = await this.usuariosService.LoginByEmail(correo);
    const paginas = await this.paginasService.obtenerPaginasConPermisos(
      usuario.perfil.idPerfil,
    );
    if (!usuario) {
      throw new UnauthorizedException('UNAUTHORIZED, Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(
      claveAcceso,
      usuario.claveAcceso,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('UNAUTHORIZED, Invalid password');
    }

    const payload = { correo: usuario.correo };

    const token = await this.jwtService.signAsync(payload);

    const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;
    return {
      token: token,
      idUsuario: usuario.idUsuario,
      nombreUsuario: nombreCompleto,
      Pagina: paginas,
    };
  }
  async register(registerDto: RegisterDto) {
    const usuario = await this.usuariosService.create(registerDto);
    if (!usuario) {
      throw new NotFoundException('Error al registrar');
    }

    try {
      await this.mailService.correoRegistro(
        usuario.correo,
        usuario.nombreCompleto,
      );

      return {
        id: usuario.id,
        nombreCompleto: usuario.nombreCompleto,
        correo: usuario.correo,
      };
    } catch (error) {
      throw new Error('Error al enviar correo: ' + error.message);
    }
  }

  async verify(verifyToken:string){
    try {
      const decifrarToken = this.encryptionService.decrypt(verifyToken);
      const usuario = await this.usuariosService.VirifyByEmail(decifrarToken);
      const actualizarEstado = await this.usuariosService.updateEstado(usuario.idUsuario,true)
    return {
      id: usuario.idUsuario,
      nombreCompleto: `${usuario.nombre} ${usuario.apellido}`,
      correo: usuario.correo,
      estado: actualizarEstado
    };
    } catch (error) {
      throw new Error('Error al verificar token: ' + error.message);
    }
    
  }
}
