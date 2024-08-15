import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsRut } from '../../../common/decorators/is-rut.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTributoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Juan',
    description: 'ingrese un nombre',
    required: true,
  })
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Perez',
    description: 'ingrese un apellido',
    required: true,
  })
  apellido: string;

  @IsOptional()
  @IsString()
  @IsRut()
  @ApiProperty({
    example: '111111111-1',
    description: 'ingrese un rut',
  })
  rut: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: '2024-07-24T19:00:00',
    description: 'ingrese una fecha valida',
  })
  fechaNacimiento: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: '2024-07-24T19:00:00',
    description: 'ingrese una fecha valida',
  })
  fechaDefuncion: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'ingrese una idSuscripcion',
  })
  idSubscripcion: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'cakabckbkabckjbakcbkabjcsbjbsjbscjabjkbc',
    description: 'ingrese QR',
  })
  qr: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://qrtributos.cl/vstvtsvtvsuuvsvuvusv',
    description: 'ingrese url',
  })
  urlPersonalizada: string;
}
