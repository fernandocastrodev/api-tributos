import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateImagenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'www.misimagenes.cl/mi-imagen.jpg',
    description: 'ingrese el estado de la suscripcion',
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
  @IsInt()
  @ApiProperty({
    example: '1',
    description: 'ingrese una idGaleria',
  })
  idGaleria: number;
}
