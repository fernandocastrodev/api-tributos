import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreatePlanDto } from '../../tribute-spaces/planes/dto/create-plan.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear un nuevo plan' }),
        ApiBody({
          description: 'Datos necesarios para crear un plan',
          type: CreatePlanDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Plan creado con éxito',
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

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todos los planes' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Planes encontrados correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Planes no encontrados',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener plan por ID' }),
        ApiParam({ name: 'id', description: 'ID del plan por buscar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Plan encontrado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Plan no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar un plan por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID del plan por actualizar',
        }),
        ApiBody({
          description: 'Datos necesarios para actualizar un plan',
          type: CreatePlanDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Plan actualizado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Plan no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar un plan por su ID' }),
        ApiParam({ name: 'id', description: 'ID del plan por eliminar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Plan eliminado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'plan no encontrado',
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
