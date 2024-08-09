import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { EncryptionService } from '../../common/services/encryptions/encryption.service';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly encryptionService: EncryptionService,
  ) {}

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

  @Post('encrypt')
  encryptData(@Body('text') text: string): string {
    return this.encryptionService.encrypt(text);
  }

  @Post('decrypt')
  decryptData(@Body('text') encryptedText: string): string {
    return this.encryptionService.decrypt(encryptedText);
  }

  @Post('hash-password')
  async hashPassword(@Body('password') password: string): Promise<string> {
    return await this.encryptionService.hashPassword(password);
  }

  @Post('compare-passwords')
  async comparePasswords(
    @Body('password') password: string,
    @Body('hash') hash: string,
  ): Promise<boolean> {
    return await this.encryptionService.comparePasswords(password, hash);
  }
}
