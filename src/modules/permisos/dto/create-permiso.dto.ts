import { Entity } from 'typeorm';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CreatePermisoDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'permiso para ver modulo',
  })
  ver: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'permiso para crear modulo',
    required: false,
  })
  crear: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'permiso para eliminar modulo',
    required: false,
  })
  eliminar: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'permiso para acualizar modulo',
    required: false,
  })
  actualizar: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'ingrese idPerfil',
  })
  idPerfil: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'ingrese idPagina',
  })
  idPagina: string;
}
