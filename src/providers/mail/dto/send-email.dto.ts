import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { validationMessages } from '../../../common/validators/validation-messages';

export class SendEmailDto {
  @IsEmail({}, { message: validationMessages.isEmail })
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @ApiProperty({
    example: 'persona@example.com',
    description: 'ingreso un correo de envio',
  })
  sender: string;

  @IsEmail({}, { message: validationMessages.isEmail })
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @ApiProperty({
    example: 'persona@example.com',
    description: 'ingreso un correo de destino',
  })
  recipient: string;

  @IsString({ message: validationMessages.isString })
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @ApiProperty({
    example: 'Bienvenido a nuestro sistema',
    description: 'Asunto del correo electrónico.',
  })
  subject: string;

  @IsString({ message: validationMessages.isString })
  @IsNotEmpty({ message: validationMessages.isNotEmpty })
  @ApiProperty({
    example: 'Agradesemos confiar en nosotros y gracias...',
    description: 'Contenido del correo electrónico.',
  })
  content: string;
}
