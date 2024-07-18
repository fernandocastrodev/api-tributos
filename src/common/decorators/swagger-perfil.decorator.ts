import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreatePerfilDto } from '../../modules/perfiles/dto/create-perfil.dto';
import { UpdatePerfilDto } from '../../modules/perfiles/dto/update-perfil.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear un nuevo perfil' }),
        ApiBody({
          description: 'Datos necesarios para crear un perfil',
          type: CreatePerfilDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Perfil creado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description:
            'El nombre de perfil ya existe o los datos de entrada no son válidos',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description:
            'Hubo un error interno del servidor al intentar crear el perfil',
        }),
      );

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todos los perfiles' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Lista de todos los perfiles encontrados',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'No se encontraron perfiles en la base de datos',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al obtener los perfiles',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener perfil por ID' }),
        ApiParam({ name: 'id', description: 'ID del perfil por buscar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Perfil encontrado por ID',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Perfil no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al obtener el perfil por ID',
        }),
      );

    case 'findOneByName':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener perfil por nombre' }),
        ApiParam({ name: 'name', description: 'Nombre del perfil a buscar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Perfil encontrado por nombre',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'nombre perfil no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al obtener el perfil por nombre',
        }),
      );

    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar un perfil por su ID' }),
        ApiParam({ name: 'id', description: 'ID del perfil por actualizar' }),
        ApiBody({
          description: 'Datos necesarios para actualizar un perfil',
          type: CreatePerfilDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Perfil actualizado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description:
            'El nombre de perfil ya existe o los datos de entrada no son válidos',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Perfil no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al actualizar el perfil por ID',
        }),
      );

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar perfil por ID' }),
        ApiParam({ name: 'id', description: 'ID del perfil por eliminar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Perfil eliminado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Perfil no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error al eliminar el perfil por ID',
        }),
      );

    default:
      throw new Error('Acción no soportada');
  }
}
