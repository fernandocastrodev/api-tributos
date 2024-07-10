import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePaginaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Ventas',
    description: 'ingrese un nombre de pagina',
  })
  nombrePagina: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'mantenedor de ventas',
    description: 'ingrese un descripcion de pagina',
  })
  descripcionPagina: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'mantVentas.html',
    description: 'ingrese una url para pagina',
  })
  urlPagina: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'image/ventas.svg',
    description: 'ingrese una ruta para el icono',
  })
  iconoPagina: string;

  @IsInt()
  @ApiProperty({
    example: '10',
    description: 'orden en la que se muestran los botones',
  })
  orden: number;
}
