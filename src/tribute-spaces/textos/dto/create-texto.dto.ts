import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTextoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'El tributo era una persona...',
    description: 'ingrese parrafo para el tributo',
  })
  texto: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Titulo',
    description: 'ingrese el tipo de texto',
  })
  tipoTexto: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'ingrese una idGaleria',
  })
  idGaleria: string;
}
