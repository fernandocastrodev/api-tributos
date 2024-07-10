import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreatePaginaDto } from '../../modules/paginas/dto/create-pagina.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear una nueva página' }),
        ApiBody({
          description: 'Datos necesarios para crear una página',
          type: CreatePaginaDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Página creada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description:
            'Datos de entrada como url o numero de orden ya existentes o no son válidos',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todas las páginas' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Lista de todas las páginas encontradas',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'No se encontraron páginas en la base de datos',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al obtener las páginas',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener página por ID' }),
        ApiParam({ name: 'id', description: 'ID de la página a buscar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Página encontrada por ID',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Página no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al obtener la página',
        }),
      );

    case 'findOneByName':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener página por nombre' }),
        ApiParam({ name: 'name', description: 'Nombre de la página a buscar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Página encontrada por nombre',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Página no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al obtener la página',
        }),
      );

    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar una página por su ID' }),
        ApiParam({ name: 'id', description: 'ID de la página a actualizar' }),
        ApiBody({
          description: 'Datos necesarios para actualizar una página',
          type: CreatePaginaDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Página actualizada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description:
            'Datos de entrada como url o numero de orden ya existentes o no son válidos',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Página no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al actualizar la página',
        }),
      );

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar una página por su ID' }),
        ApiParam({ name: 'id', description: 'ID de la página a eliminar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Página eliminada correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Página no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al eliminar la página',
        }),
      );

    default:
      throw new Error('Acción no soportada');
  }
}
