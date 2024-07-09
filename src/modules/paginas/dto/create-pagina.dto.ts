import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  isInt,
} from 'class-validator';

export class CreatePaginaDto {
  @IsNotEmpty()
  @IsString()
  nombrePagina: string;

  @IsOptional()
  @IsString()
  descripcionPagina: string;

  @IsNotEmpty()
  @IsString()
  urlPagina: string;

  @IsOptional()
  @IsString()
  iconoPagina: string;

  @IsInt()
  orden: number;
}
