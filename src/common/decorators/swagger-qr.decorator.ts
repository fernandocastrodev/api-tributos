import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'qr':
      return applyDecorators(
        ApiOperation({ summary: 'Crear un qr de la url del tributo' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'QR creado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    default:
      throw new Error('Acción no soportada');
  }
}
