import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreatePlantillaDto } from '../../tribute-spaces/plantillas/dto/create-plantilla.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear una nueva plantilla' }),
        ApiBody({
          description: 'Datos necesarios para crear una plantilla',
          type: CreatePlantillaDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Plantilla creada con éxito',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todas las plantillas' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Plantillas encontradas correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'plantillas no encontradas',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener plantilla por ID' }),
        ApiParam({ name: 'id', description: 'ID de la plantilla por buscar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Plantilla encontrada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'plantilla no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar una plantilla por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID de la plantilla por actualizar',
        }),
        ApiBody({
          description: 'Datos necesarios para actualizar una plantilla',
          type: CreatePlantillaDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Plantilla actualizada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'plantilla no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar una plantilla por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID de la plantilla por eliminar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Plantilla eliminada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'plantilla no encontrada',
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
