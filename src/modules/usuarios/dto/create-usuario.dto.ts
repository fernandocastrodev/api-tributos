import { Exclude, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsRut } from '../../../common/decorators/is-rut.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { validationMessages } from '../../../common/validators/validation-messages';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Persona',
    description: 'ingrese un nombre',
    required: true,
  })
  nombre: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Ejemplo',
    description: 'ingrese un apellido',
    required: true,
  })
  apellido: string;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @IsRut()
  @ApiProperty({
    example: '111111111-1',
    description: 'ingrese un rut',
    required: false,
  })
  rut: string;

  @Exclude()
  @IsOptional()
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  usuarioAcceso: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @MinLength(6, { message: validationMessages.minLength(6) })
  @ApiProperty({
    example: 'replace_with_test_password',
    description: 'ingrese una clave',
    required: true,
  })
  claveAcceso: string;

  @IsString({ message: validationMessages.isString })
  @IsEmail({}, { message: validationMessages.isEmail })
  @ApiProperty({
    example: 'persona@example.com',
    description: 'ingrese un correo',
  })
  correo: string;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'm',
    description: 'ingrese su genero',
    required: false,
  })
  genero: string;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Calle Ejemplo 123',
    description: 'ingrese su direccion',
    required: false,
  })
  direccion: string;

  @IsOptional()
  @IsBoolean({ message: validationMessages.isBoolean })
  @ApiProperty({
    example: 'true',
    description: 'ingrese el estado del usuario',
    required: false,
  })
  estado: boolean;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1',
    description: 'ingrese una idPerfil',
  })
  idPerfil: string;
}
