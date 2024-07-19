import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreateSuscripcionDto } from '../../tribute-spaces/suscripciones/dto/create-suscripcion.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear una nueva suscripcion' }),
        ApiBody({
          description: 'Datos necesarios para crear una suscripcion',
          type: CreateSuscripcionDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Suscripcion creada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Datos como idUsuario o idPlan no encontrados',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todas las suscripciones' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Suscripciones encontradas correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'suscripciones no encontradas',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener suscripcion por ID' }),
        ApiParam({
          name: 'id',
          description: 'ID de la suscripcion por buscar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Suscripcion encontrada correctamente',
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

    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar una suscripcion por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID de la suscripcion por actualizar',
        }),
        ApiBody({
          description: 'Datos necesarios para actualizar una suscripcion',
          type: CreateSuscripcionDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Suscripcion actualizada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
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

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar una suscripcion por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID de la suscripcion por eliminar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Suscripcion eliminada correctamente',
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

    default:
      throw new Error('Acción no soportada');
  }
}
