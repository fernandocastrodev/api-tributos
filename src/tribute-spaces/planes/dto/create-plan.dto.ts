import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validationMessages } from '../../../common/validators/validation-messages';

export class CreatePlanDto {
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Plan Básico',
    description: 'Escribe un nombre al plan',
  })
  nombre: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsInt({ message: validationMessages.isInt })
  @ApiProperty({
    example: '7990',
    description: 'Escribe un Precio para el plan',
  })
  precio: number;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example:
      'Acceso a funciones básicas como la creación de un perfil conmemorativo...',
    description: 'Agregar una descripcion detallada',
  })
  descripcion: string;

  @IsOptional()
  @IsBoolean({ message: validationMessages.isBoolean })
  @ApiProperty({
    example: 'true',
    description: 'Agregar un estado en true o false',
  })
  estado: boolean;
}
