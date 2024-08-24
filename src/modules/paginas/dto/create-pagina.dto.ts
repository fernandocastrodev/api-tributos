import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { validationMessages} from '../../../common/validators/validation-messages'

export class CreatePaginaDto {
  
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Ventas',
    description: 'ingrese un nombre de pagina',
  })
  nombrePagina: string;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'mantenedor de ventas',
    description: 'ingrese un descripcion de pagina',
    required: false,
  })
  descripcionPagina: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'mantVentas.html',
    description: 'ingrese una url para pagina',
  })
  urlPagina: string;

  @IsOptional()
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'image/ventas.svg',
    description: 'ingrese una ruta para el icono',
    required: false,
  })
  iconoPagina: string;

  @IsInt({ message: validationMessages.isInt })
  @ApiProperty({
    example: '10',
    description: 'orden en la que se muestran los botones',
  })
  orden: number;
}
