import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { validationMessages } from '../../../common/validators/validation-messages';

export class CreateGaleriaDto {
  @IsInt({ message: validationMessages.isInt })
  @ApiProperty({
    example: '10',
    description: 'orden en la que se muestran los botones',
  })
  orden: number;

  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Titulos',
    description: 'ingrese un nombre galeria',
  })
  nombre: string;


  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1',
    description: 'ingrese idTipoGaleria',
  })
  idTipoGaleria: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1',
    description: 'ingrese idTributo',
  })
  idTributo: string;
}
