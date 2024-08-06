import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'persona@example.com',
    description: 'ingreso un correo de envio',
  })
  sender: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'persona@example.com',
    description: 'ingreso un correo de destino',
  })
  recipient: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Bienvenido a nuestro sistema',
    description: 'Asunto del correo electrónico.',
  })
  subject: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Agradesemos confiar en nosotros y gracias...',
    description: 'Contenido del correo electrónico.',
  })
  content: string;
}
