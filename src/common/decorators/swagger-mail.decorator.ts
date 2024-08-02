import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { SendEmailDto } from '../../providers/mail/dto/send-email.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'sendEmail':
      return applyDecorators(
        ApiOperation({ summary: 'Enviar un nuevo correo' }),
        ApiBody({
          description: 'Datos necesarios para enviar un correo',
          type: SendEmailDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Correo enviado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Error al enviar correo',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );
  }
}
