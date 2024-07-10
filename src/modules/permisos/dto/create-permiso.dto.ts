import { Entity } from 'typeorm';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
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
  })
  crear: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'permiso para eliminar modulo',
  })
  eliminar: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'permiso para acualizar modulo',
  })
  actualizar: boolean;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: '1',
    description: 'ingrese idPerfil',
  })
  idPerfil: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: '1',
    description: 'ingrese idPagina',
  })
  idPagina: number;
}
