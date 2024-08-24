import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { validationMessages } from '../../../common/validators/validation-messages';

export class CreateSuscripcionDto {
  @IsOptional()
  @IsDate({ message: validationMessages.isDate })
  @Type(() => Date)
  @ApiProperty({
    example: '2024-07-18T12:00:00',
    description: 'ingrese una fecha valida',
    required: false,
  })
  fechaSuscripcion: Date;

  @IsOptional()
  @IsBoolean({ message: validationMessages.isBoolean })
  @ApiProperty({
    example: 'true',
    description: 'ingrese el estado de la suscripcion',
    required: false,
  })
  estadoSuscripcion: boolean;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '14',
    description: 'ingrese una idUsuario',
  })
  idUsuario: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1',
    description: 'ingrese una idPlan',
  })
  idPlan: string;
}
