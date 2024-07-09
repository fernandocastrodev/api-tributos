import { Entity } from 'typeorm';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

@Entity()
export class CreatePermisoDto {
  @IsNotEmpty()
  @IsBoolean()
  ver: boolean;

  @IsOptional()
  @IsBoolean()
  crear: boolean;

  @IsOptional()
  @IsBoolean()
  eliminar: boolean;

  @IsOptional()
  @IsBoolean()
  actualizar: boolean;

  @IsNotEmpty()
  @IsInt()
  idPerfil: number;

  @IsNotEmpty()
  @IsInt()
  idPagina: number;
}
