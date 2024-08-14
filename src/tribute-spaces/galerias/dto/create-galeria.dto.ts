import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateGaleriaDto {
  @IsInt()
  @ApiProperty({
    example: '10',
    description: 'orden en la que se muestran los botones',
  })
  orden: number;

  @IsString()
  @ApiProperty({
    example: 'Titulos',
    description: 'ingrese un nombre galeria',
  })
  nombre: string;


  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: '1',
    description: 'ingrese idTipoGaleria',
  })
  idTipoGaleria: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: '1',
    description: 'ingrese idTributo',
  })
  idTributo: number;
}
