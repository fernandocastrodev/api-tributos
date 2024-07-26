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

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly paginasService: PaginasService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ correo, claveAcceso }: LoginDto) {
    const usuario = await this.usuariosService.findOneByEmail(correo);
    // const permiso = await this.permisosService.findOnePermisoByPerfil(
    //   usuario.perfil.idPerfil,
    // );
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
    return {
      id: usuario.id,
      nombreCompleto: usuario.nombreCompleto,
    };
  }
}
