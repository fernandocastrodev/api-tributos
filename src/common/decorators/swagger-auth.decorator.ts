import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { LoginDto } from '../../modules/auth/dto/login.dto';
import { RegisterDto } from '../../modules/auth/dto/register.dto';
import { EncryptDecryptDto } from '../../modules/auth/dto/encrypt-decrypt.dto';
import { ComparePasswordsDto } from '../../modules/auth/dto/compare-passwords.dto';
import { HashPasswordDto } from '../../modules/auth/dto/hash-password.dto';
import { VerifyTokenDto } from 'src/modules/auth/dto/verify-token.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'login':
      return applyDecorators(
        ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' }),
        ApiBody({
          description: 'Datos necesarios para iniciar sesion',
          type: LoginDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Token JWT generado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.UNAUTHORIZED,
          description: 'Credenciales inválidas',
        }),
      );

    case 'register':
      return applyDecorators(
        ApiOperation({ summary: 'Registro de usuarios' }),
        ApiBody({
          description: 'Datos necesarios para iniciar sesion',
          type: RegisterDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Usuario registrado con éxito',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Error al registrar',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'encryptData':
      return applyDecorators(
        ApiOperation({ summary: 'Cifrar texto' }),
        ApiBody({
          description: 'Ingresar un texto',
          type: EncryptDecryptDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Texto cifrado con éxito',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Error al cifrar texto',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'decryptData':
      return applyDecorators(
        ApiOperation({ summary: 'Decifrar texto' }),
        ApiBody({
          description: 'Ingresar un texto',
          type: EncryptDecryptDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Texto descifrado con éxito',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Error al decifrar texto',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'hashPassword':
      return applyDecorators(
        ApiOperation({ summary: 'Hashear password' }),
        ApiBody({
          description: 'Ingresar un texto',
          type: HashPasswordDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Contraseña hasheada con éxito',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Error al hashear pasword',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );
    
      case 'comparePasswords':
        return applyDecorators(
          ApiOperation({ summary: 'Comparar password' }),
          ApiBody({
            description: 'Ingresar un texto',
            type: ComparePasswordsDto,
          }),
          ApiResponse({
            status: HttpStatus.OK,
            description: 'Las contraseñas coinciden o no',
          }),
          ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Error al comparar password',
          }),
          ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'Hubo un error interno del servidor',
          }),
        );

        case 'verify':
          return applyDecorators(
            ApiOperation({ summary: 'Verificar token' }),
            ApiBody({
              description: 'Ingresar un token',
              type: VerifyTokenDto,
            }),
            ApiResponse({
              status: HttpStatus.OK,
              description: 'Token verificado con éxito',
            }),
            ApiResponse({
              status: HttpStatus.NOT_FOUND,
              description: 'Error al verificar token',
            }),
            ApiResponse({
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              description: 'Hubo un error interno del servidor',
            }),
          );

    default:
      throw new Error('Acción no soportada');
  }
}
