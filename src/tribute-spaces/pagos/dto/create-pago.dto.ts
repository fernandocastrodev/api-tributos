import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePagoDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: '2024-07-24T19:00:00',
    description: 'ingrese una fecha valida',
  })
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'snjsnjsnsnslnslsnlsnlsnlnslnslns',
    description: 'ingrese un token de pago',
  })
  token: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '7900',
    description: 'ingrese un pago de plan',
  })
  monto: number;

  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'ingrese el estado del pago',
    required: false,
  })
  estado: boolean;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: '1',
    description: 'ingrese una idSuscripcion',
  })
  idSuscripcion: number;
}
