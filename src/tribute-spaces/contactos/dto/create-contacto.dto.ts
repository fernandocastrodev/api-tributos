import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validationMessages } from '../../../common/validators/validation-messages';

export class CreateContactoDto {
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  @ApiProperty({
    example: 'Juan Perez',
    description: 'Escribe tu nombre completo',
  })
  nombre: string;

  @ApiProperty({
    example: 'persona@example.com',
    description: 'Proporciona una dirección de correo electrónico',
  })
  @IsString({ message: validationMessages.isString })
  @IsEmail({}, { message: validationMessages.isEmail })
  correo: string;

  @ApiProperty({
    example: '912341234',
    description: 'Incluye tu número de teléfono (opcional)',
  })
  @IsOptional()
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  fono: string;

  @ApiProperty({
    example: 'necesito contactarme para resolver algunas dudas que tengo...',
    description:
      'Añade cualquier detalle adicional que consideres relevante para tu consulta.',
  })
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @IsString({ message: validationMessages.isString })
  descripcion: string;
}
