import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateImagenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'www.misimagenes.cl/mi-imagen.jpg',
    description: 'ingrese la url de la imagen',
  })
  url: string;

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
