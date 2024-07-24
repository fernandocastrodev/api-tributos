import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreatePagoDto } from '../../tribute-spaces/pagos/dto/create-pago.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear un nuevo pago' }),
        ApiBody({
          description: 'Datos necesarios para crear un pago',
          type: CreatePagoDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Pago creado con éxito',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'suscripcion no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todos los pagos' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Pagos encontrados correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'pagos no encontrados',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener pago por ID' }),
        ApiParam({ name: 'id', description: 'ID del pago por buscar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Pago encontrado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'pago no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar un pago por su ID' }),
        ApiParam({ name: 'id', description: 'ID del pago por actualizar' }),
        ApiBody({
          description: 'Datos necesarios para actualizar un pago',
          type: CreatePagoDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Pago actualizado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'pago o suscripcion no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar un pago por su ID' }),
        ApiParam({ name: 'id', description: 'ID del pago por eliminar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Pago eliminado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'pago no encontrado',
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
