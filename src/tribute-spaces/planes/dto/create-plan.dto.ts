import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePlanDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Plan Básico',
    description: 'Escribe un nombre al plan',
  })
  nombre: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: '7990',
    description: 'Escribe un Precio para el plan',
  })
  precio: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'Acceso a funciones básicas como la creación de un perfil conmemorativo...',
    description: 'Agregar una descripcion detallada',
  })
  descripcion: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'Agregar un estado en true o false',
  })
  estado: boolean;
}
