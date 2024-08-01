import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreateVideoDto } from '../../tribute-spaces/videos/dto/create-video.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear un nuevo video' }),
        ApiBody({
          description: 'Datos necesarios para crear un video',
          type: CreateVideoDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Video creado correctamente',
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
        ApiOperation({ summary: 'Obtener todos los videos' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Videos encontrados correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'videos no encontrados',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener video por ID' }),
        ApiParam({
          name: 'id',
          description: 'ID del video por buscar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Video encontrado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'video no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar un video por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID del video por actualizar',
        }),
        ApiBody({
          description: 'Datos necesarios para actualizar un video',
          type: CreateVideoDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Video actualizado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'video o galeria no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar un video por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID del video por eliminar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Video eliminado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'video no encontrado',
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
