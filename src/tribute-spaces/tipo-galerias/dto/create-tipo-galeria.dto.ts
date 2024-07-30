import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoGaleriaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'imagen',
    description: 'ingrese un tipo de galeria',
    required: true,
  })
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'imagen para galeria',
    description: 'ingrese una descripcion',
    required: true,
  })
  descipcion: string;
}
