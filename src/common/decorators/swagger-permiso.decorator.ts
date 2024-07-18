import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreatePermisoDto } from '../../modules/permisos/dto/create-permiso.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear un nuevo permiso' }),
        ApiBody({
          description: 'Datos necesarios para crear un permiso',
          type: CreatePermisoDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Permiso creado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description:
            'Datos de entrada como idPerfil o idPagina no válidos, o La página ya existe para el perfil otorgado',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Perfil o página no encontrados',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todos los permisos' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Lista de todos los permisos encontrados',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'No se encontraron permisos en la base de datos',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al obtener los permisos',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener permiso por ID' }),
        ApiParam({ name: 'id', description: 'ID del permiso por buscar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Permiso encontrado por ID',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Permiso no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al obtener el permiso',
        }),
      );

    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar un permiso por su ID' }),
        ApiParam({ name: 'id', description: 'ID del permiso por actualizar' }),
        ApiBody({
          description: 'Datos necesarios para actualizar un permiso',
          type: CreatePermisoDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Permiso actualizado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada como perfil o página no encontrados',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Permiso no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al actualizar el permiso',
        }),
      );

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar un permiso por su ID' }),
        ApiParam({ name: 'id', description: 'ID del permiso por eliminar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Permiso eliminado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Permiso no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al eliminar el permiso',
        }),
      );

    default:
      throw new Error('Acción no soportada');
  }
}
