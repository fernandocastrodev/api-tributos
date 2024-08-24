import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { validationMessages} from '../../../common/validators/validation-messages'

@Entity()
export class CreatePermisoDto {
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsBoolean({ message: validationMessages.isBoolean })
  @ApiProperty({
    example: 'true',
    description: 'permiso para ver modulo',
  })
  ver: boolean;

  @IsOptional()
  @IsBoolean({ message: validationMessages.isBoolean })
  @ApiProperty({
    example: 'true',
    description: 'permiso para crear modulo',
    required: false,
  })
  crear: boolean;

  @IsOptional()
  @IsBoolean({ message: validationMessages.isBoolean })
  @ApiProperty({
    example: 'true',
    description: 'permiso para eliminar modulo',
    required: false,
  })
  eliminar: boolean;

  @IsOptional()
  @IsBoolean({ message: validationMessages.isBoolean })
  @ApiProperty({
    example: 'true',
    description: 'permiso para acualizar modulo',
    required: false,
  })
  actualizar: boolean;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1',
    description: 'ingrese idPerfil',
  })
  idPerfil: string;

  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: '1',
    description: 'ingrese idPagina',
  })
  idPagina: string;
}
