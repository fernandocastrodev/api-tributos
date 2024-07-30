import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateTipoGaleriaDto } from '../../tribute-spaces/tipo-galerias/dto/create-tipo-galeria.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear un nuevo tipo de galeria' }),
        ApiBody({
          description: 'Datos necesarios para crear un tipo de galeria',
          type: CreateTipoGaleriaDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Tipo Galeria creada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description:
            'El nombre tipo galeria ya existe o los datos de entrada no son válidos.',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todos los tipos de galerias' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Tipos de Galerias encontradas correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'tipos de galerias no encontradas',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );
    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener un tipo galeria por ID' }),
        ApiParam({ name: 'id', description: 'ID del tipo galeria por buscar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Tipo de Galeria encontrada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'tipo de galeria no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );
    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar un tipo galeria existente' }),
        ApiParam({
          name: 'id',
          description: 'ID del tipo galeria por actualizar',
        }),
        ApiBody({
          description: 'Datos necesarios para actualizar un tipo galeria',
          type: CreateTipoGaleriaDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Tipo de Galeria actualizada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description:
            'El nombre tipo galeria ya existe o los datos de entrada no son válidos.',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'tipo de galeria no encontrado.',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );
    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar un tipo galeria' }),
        ApiParam({
          name: 'id',
          description: 'ID del tipo galeria por eliminar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Tipo de Galeria eliminada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'tipo de galeria no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );
    default:
      return applyDecorators();
  }
}
