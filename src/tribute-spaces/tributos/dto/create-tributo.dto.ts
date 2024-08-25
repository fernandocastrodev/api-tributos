import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsRut } from '../../../common/decorators/is-rut.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { validationMessages } from '../../../common/validators/validation-messages';

export class CreateTributoDto {

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Juan',
    description: 'ingrese un nombre',
    required: true,
  })
  nombre: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Perez',
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
  })
  rut: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsDate({ message: validationMessages.isDate })
  @Type(() => Date)
  @ApiProperty({
    example: '2024-07-24T19:00:00',
    description: 'ingrese una fecha valida',
  })
  fechaNacimiento: Date;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsDate({ message: validationMessages.isDate })
  @Type(() => Date)
  @ApiProperty({
    example: '2024-07-24T19:00:00',
    description: 'ingrese una fecha valida',
  })
  fechaDefuncion: Date;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1',
    description: 'ingrese una idSuscripcion',
  })
  idSubscripcion: string;

}
