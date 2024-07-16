import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Juan Perez',
    description: 'Escribe tu nombre completo',
  })
  nombre: string;

  @ApiProperty({
    example: 'persona@example.com',
    description: 'Proporciona una dirección de correo electrónico',
  })
  @IsString()
  @IsEmail()
  correo: string;

  @ApiProperty({
    example: '912341234',
    description: 'Incluye tu número de teléfono (opcional)',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  fono: string;

  @ApiProperty({
    example: 'necesito contactarme para resolver algunas dudas que tengo...',
    description:
      'Añade cualquier detalle adicional que consideres relevante para tu consulta.',
  })
  @IsNotEmpty()
  @IsString()
  descripcion: string;
}
