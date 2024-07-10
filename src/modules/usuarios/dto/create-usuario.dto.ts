import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsRut } from '../../../common/decorators/is-rut.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Juan',
    description: 'ingrese un nombre',
  })
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Perez',
    description: 'ingrese un apellido',
  })
  apellido: string;

  @IsOptional()
  @IsString()
  @IsRut()
  @ApiProperty({
    example: '111111111-1',
    description: 'ingrese un rut',
  })
  rut: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  usuarioAcceso: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: '123456',
    description: 'ingrese una clave',
  })
  claveAcceso: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'persona@example.com',
    description: 'ingrese un correo',
  })
  correo: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'm',
    description: 'ingrese su genero',
  })
  genero: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'ingrese el estado del usuario',
  })
  estado: boolean;

  @ApiProperty({
    example: '1',
    description: 'ingrese una idPerfil',
  })
  @IsNotEmpty()
  @IsInt()
  idPerfil: number;
}
