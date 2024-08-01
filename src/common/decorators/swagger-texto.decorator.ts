import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreateTextoDto } from '../../tribute-spaces/textos/dto/create-texto.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear un nuevo texto' }),
        ApiBody({
          description: 'Datos necesarios para crear un texto',
          type: CreateTextoDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Texto creado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Datos como galeria no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todos los textos' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Textos encontrados correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'textos no encontrados',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener texto por ID' }),
        ApiParam({
          name: 'id',
          description: 'ID del texto por buscar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Texto encontrado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'texto no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar un texto por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID del texto por actualizar',
        }),
        ApiBody({
          description: 'Datos necesarios para actualizar un texto',
          type: CreateTextoDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Texto actualizado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'texto o galeria no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar un texto por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID del texto por eliminar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Texto eliminado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'texto no encontrado',
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
