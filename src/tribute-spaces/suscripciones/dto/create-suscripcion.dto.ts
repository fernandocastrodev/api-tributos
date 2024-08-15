import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
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
    description: 'ingrese el estado de la suscripcion',
    required: false,
  })
  estadoSuscripcion: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '14',
    description: 'ingrese una idUsuario',
  })
  idUsuario: string;

  @ApiProperty({
    example: '1',
    description: 'ingrese una idPlan',
  })
  @IsNotEmpty()
  @IsString()
  idPlan: string;
}
