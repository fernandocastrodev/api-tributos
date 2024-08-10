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
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { EncryptionService } from '../../common/services/encryptions/encryption.service';
import { EncryptDecryptDto } from './dto/encrypt-decrypt.dto';
import { HashPasswordDto } from './dto/hash-password.dto';
import { VerifyTokenDto} from './dto/verify-token.dto'
import { ComparePasswordsDto } from './dto/compare-passwords.dto';
import { SwaggerDocumentation } from '../../common/decorators/swagger-auth.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly encryptionService: EncryptionService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('login', 'Iniciar sesion')

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
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('register', 'Registro de usuarios')
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


  @Post('verify-token')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('verify', 'Verificar token')
  async verify(@Body() verifyTokenDto: VerifyTokenDto) {
    try {
      const token = await this.authService.verify(verifyTokenDto.token)
      return {
        message: 'Token verificado con éxito',
        error: null,
        statusCode: HttpStatus.OK,
        Data: { token },
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('encrypt')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('encryptData', 'Cifrar texto')
  encryptData(@Body() encryptDecryptDto: EncryptDecryptDto) {
    try {
      const encryptedData = this.encryptionService.encrypt(encryptDecryptDto.text);
      return {
        message: 'Texto cifrado con éxito',
        error: null,
        statusCode: HttpStatus.OK,
        Data: { encryptedData },
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('decrypt')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('decryptData', 'Decifrar texto')
  decryptData(@Body() encryptDecryptDto: EncryptDecryptDto) {
    try {
      const decryptedData = this.encryptionService.decrypt(encryptDecryptDto.text);
      return {
        message: 'Texto descifrado con éxito',
        error: null,
        statusCode: HttpStatus.OK,
        Data: { decryptedData },
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('hash-password')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('hashPassword', 'Hashear password')
  async hashPassword(@Body() hashPasswordDto: HashPasswordDto) {
    try {
      const hashedPassword = await this.encryptionService.hashPassword(hashPasswordDto.password);
      return {
        message: 'Contraseña hasheada con éxito',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: { hashedPassword },
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('compare-passwords')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('comparePasswords', 'Comparar password')
  async comparePasswords(@Body() comparePasswordsDto: ComparePasswordsDto) {
    try {
      const isMatch = await this.encryptionService.comparePasswords(
        comparePasswordsDto.password,
        comparePasswordsDto.hash,
      );
      return {
        message: isMatch ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden',
        error: null,
        statusCode: HttpStatus.OK,
        Data: { isMatch },
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

}
