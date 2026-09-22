import { Exclude, Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'usuario registro',
    description: 'ingrese un nombre',
    required: true,
  })
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'usuario apellido',
    description: 'ingrese un apellido',
    required: true,
  })
  apellido: string;

  @Exclude()
  @IsOptional()
  rut: string = null;

  @Exclude()
  @IsOptional()
  usuarioAcceso: string = null;

  @Exclude()
  @IsOptional()
  genero: string = 'm';

  @Exclude()
  @IsOptional()
  estado: boolean = false;

  @Exclude()
  @IsOptional()
  direccion: string = null;

  @Exclude()
  @IsOptional()
  idPerfil: string = '6a4c2b8e-d21e-4d55-a2c3-5f6d9b3e2a6f';

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'persona@example.com',
    description: 'ingrese un correo',
  })
  correo: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'replace_with_test_password',
    description: 'ingrese una clave',
    required: true,
  })
  claveAcceso: string;
}
