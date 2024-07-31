import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreateImagenDto } from '../../tribute-spaces/imagenes/dto/create-imagen.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear una nueva imagen' }),
        ApiBody({
          description: 'Datos necesarios para crear una imagen',
          type: CreateImagenDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Imagen creada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Datos como idgaleria no encontradas',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todas las imagenes' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Imagenes encontradas correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'imagenes no encontradas',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener imagen por ID' }),
        ApiParam({
          name: 'id',
          description: 'ID de la imagen por buscar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Imagen encontrada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'imagen no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar una imagen por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID de la imagen por actualizar',
        }),
        ApiBody({
          description: 'Datos necesarios para actualizar una imagen',
          type: CreateImagenDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Imagen actualizada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'imagen o galeria no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar una imagen por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID de la imagen por eliminar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Imagen eliminada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Imagen o galeria no encontrada',
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
