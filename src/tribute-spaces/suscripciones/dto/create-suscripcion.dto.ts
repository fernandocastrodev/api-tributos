import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSuscripcionDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: '2024-07-18T12:00:00',
    description: 'ingrese una fecha valida',
    required: false,
  })
  fechaSuscripcion: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'ingrese el estado del usuario',
    required: false,
  })
  estadoSuscripcion: boolean;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: '14',
    description: 'ingrese una idUsuario',
  })
  idUsuario: number;

  @ApiProperty({
    example: '1',
    description: 'ingrese una idPlan',
  })
  @IsNotEmpty()
  @IsInt()
  idPlan: number;
}
