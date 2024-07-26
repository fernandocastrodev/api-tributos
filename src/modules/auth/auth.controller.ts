import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token JWT generado correctamente',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciales inválidas',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const { token, idUsuario, nombreUsuario, Pagina } =
        await this.authService.login(loginDto);
      return {
        message: 'Token creado con éxito',
        error: null,
        statusCode: HttpStatus.OK,
        Data: { token, idUsuario, nombreUsuario },
        DataList: Pagina,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error de autenticación',
          error: error.message,
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const usuario = await this.authService.register(registerDto);
      return {
        message: 'Usuario registrado con éxito',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: usuario,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
