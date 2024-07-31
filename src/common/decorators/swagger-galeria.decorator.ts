import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreateGaleriaDto } from '../../tribute-spaces/galerias/dto/create-galeria.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear una nueva galeria' }),
        ApiBody({
          description: 'Datos necesarios para crear una nueva galeria',
          type: CreateGaleriaDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Galeria creada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Datos como idTipoGaleria o idTributo no encontrados',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todas las galeria' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Galerias encontradas correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'galerias no encontradas',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener galeria por ID' }),
        ApiParam({
          name: 'id',
          description: 'ID de la galeria por buscar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Galeria encontrada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'galeria no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar una galeria por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID de la galeria por actualizar',
        }),
        ApiBody({
          description: 'Datos necesarios para actualizar una galeria',
          type: CreateGaleriaDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Galeria actualizada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'tipo galeria o tributo no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar una galeria por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID de la galeria por eliminar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Galeria eliminada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'galeria no encontrada',
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
