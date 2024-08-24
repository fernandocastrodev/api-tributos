import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validationMessages } from '../../../common/validators/validation-messages';

export class CreatePlantillaDto {

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Correo Bienvenida',
    description: 'Escribe un nombre para el tipo de correo',
  })
  nombre: string;

  @IsString({ message: validationMessages.isString })
  @IsEmail({}, { message: validationMessages.isEmail })
  @ApiProperty({
    example: 'persona@example.com',
    description: 'Direccion de correo necesario para este tipo',
  })
  correo: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Binvenido a nuestro sistema...',
    description: 'Agregar un cuerpo de correo',
  })
  descripcion: string;

  @IsOptional()
  @IsBoolean({ message: validationMessages.isBoolean })
  @ApiProperty({
    example: 'true',
    description: 'Agregar un estado en true o false',
  })
  estado: boolean;
}
