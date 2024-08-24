import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { validationMessages } from '../../../common/validators/validation-messages';

export class CreateTipoGaleriaDto {

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'imagen',
    description: 'ingrese un tipo de galeria',
    required: true,
  })
  nombre: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'imagen para galeria',
    description: 'ingrese una descripcion',
    required: true,
  })
  descipcion: string;
}
