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

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ correo, claveAcceso }: LoginDto) {
    const usuario = await this.usuariosService.findOneByEmail(correo);

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

    return {
      token: token,
      email: usuario.correo,
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
