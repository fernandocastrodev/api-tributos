import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { validationMessages } from '../../../common/validators/validation-messages';

export class CreateImagenDto {

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1111-1111-1111',
    description: 'ingrese id Usuario',
  })
  idUsuario: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1111-1111-1111',
    description: 'ingrese id tributo',
  })
  idTributo: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Ingrese la imagen que desea cargar',
  })
  image: any;

  @IsOptional()
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'imagen de tributo',
    description: 'ingrese una descripcion de la imagen',
    required: false,
  })
  texto: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1',
    description: 'ingrese una idGaleria',
  })
  idGaleria: string;


}
