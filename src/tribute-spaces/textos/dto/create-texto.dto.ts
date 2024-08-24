import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { validationMessages } from '../../../common/validators/validation-messages';

export class CreateTextoDto {

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'El tributo era una persona...',
    description: 'ingrese parrafo para el tributo',
  })
  texto: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Titulo',
    description: 'ingrese el tipo de texto',
  })
  tipoTexto: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1',
    description: 'ingrese una idGaleria',
  })
  idGaleria: string;
}
