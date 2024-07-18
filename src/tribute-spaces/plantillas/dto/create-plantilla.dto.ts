import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlantillaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Correo Bienvenida',
    description: 'Escribe un nombre para el tipo de correo',
  })
  nombre: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'persona@example.com',
    description: 'Direccion de correo necesario para este tipo',
  })
  correo: string;

  @ApiProperty({
    example: 'Binvenido a nuestro sistema...',
    description: 'Agregar un cuerpo de correo',
  })
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'Agregar un estado en true o false',
  })
  estado: boolean;
}
