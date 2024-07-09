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

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsOptional()
  @IsString()
  @IsRut()
  rut: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  usuarioAcceso: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  claveAcceso: string;

  @IsString()
  @IsEmail()
  correo: string;

  @IsOptional()
  @IsString()
  genero: string;

  @IsOptional()
  @IsBoolean()
  estado: boolean;

  @IsNotEmpty()
  @IsInt()
  idPerfil: number;
}
