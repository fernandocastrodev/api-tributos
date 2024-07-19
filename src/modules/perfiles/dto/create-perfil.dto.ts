import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePerfilDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Supervisor',
    description: 'ingrese un nombre de perfil',
  })
  nombre: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'El supervisor se encarga de...',
    description: 'ingrese una descripcion del perfil',
    required: false,
  })
  descripcion: string;
}
