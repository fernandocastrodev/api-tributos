import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, isString, IsString } from 'class-validator';

export class CreateImagenDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1111-1111-1111',
    description: 'ingrese id Usuario',
  })
  idUsuario: string;

  @IsNotEmpty()
  @IsString()
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
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'imagen de tributo',
    description: 'ingrese una descripcion de la imagen',
    required: false,
  })
  texto: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'ingrese una idGaleria',
  })
  idGaleria: string;


}
