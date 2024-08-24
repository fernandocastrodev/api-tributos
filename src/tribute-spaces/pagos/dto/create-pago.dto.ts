import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { validationMessages } from '../../../common/validators/validation-messages';

export class CreatePagoDto {
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsDate({ message: validationMessages.isDate })
  @Type(() => Date)
  @ApiProperty({
    example: '2024-07-24T19:00:00',
    description: 'ingrese una fecha valida',
  })
  fecha: Date;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'snjsnjsnsnslnslsnlsnlsnlnslnslns',
    description: 'ingrese un token de pago',
  })
  token: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @ApiProperty({
    example: '7900',
    description: 'ingrese un pago de plan',
  })
  monto: number;

  @IsBoolean({ message: validationMessages.isBoolean })
  @ApiProperty({
    example: 'true',
    description: 'ingrese el estado del pago',
    required: false,
  })
  estado: boolean;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1',
    description: 'ingrese una idSuscripcion',
  })
  idSuscripcion: string;
}
