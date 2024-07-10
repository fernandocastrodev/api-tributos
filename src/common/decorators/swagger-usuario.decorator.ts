import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateUsuarioDto } from '../../modules/usuarios/dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../../modules/usuarios/dto/update-usuario.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear un nuevo usuario' }),
        ApiBody({
          description: 'Datos necesarios para crear un usuario',
          type: CreateUsuarioDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'El usuario ha sido creado correctamente.',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description:
            'El correo ya existe o los datos de entrada no son válidos.',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'El perfil especificado no fue encontrado.',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description:
            'Error interno del servidor al intentar crear el usuario.',
        }),
      );
    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar un usuario existente' }),
        ApiParam({ name: 'id', description: 'ID del usuario a actualizar' }),
        ApiBody({
          description: 'Datos necesarios para actualizar un usuario',
          type: CreateUsuarioDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'El usuario ha sido actualizado correctamente.',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description:
            'El usuario o perfil no fueron encontrados, o los datos de entrada no son válidos.',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'El usuario especificado no fue encontrado.',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description:
            'Error interno del servidor al intentar actualizar el usuario.',
        }),
      );
    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todos los usuarios' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Lista de usuarios obtenida correctamente.',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'No se encontraron usuarios en la base de datos.',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description:
            'Error interno del servidor al intentar obtener los usuarios.',
        }),
      );
    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener un usuario por ID' }),
        ApiParam({ name: 'id', description: 'ID del usuario a buscar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'El usuario ha sido encontrado.',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'El usuario especificado no fue encontrado.',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description:
            'Error interno del servidor al intentar obtener el usuario por ID.',
        }),
      );
    case 'findOneByRut':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener un usuario por RUT' }),
        ApiParam({ name: 'rut', description: 'RUT del usuario a buscar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'El usuario ha sido encontrado.',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'El usuario con el RUT especificado no fue encontrado.',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description:
            'Error interno del servidor al intentar obtener el usuario por RUT.',
        }),
      );
    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar un usuario' }),
        ApiParam({ name: 'id', description: 'ID del usuario a eliminar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'El usuario ha sido eliminado correctamente.',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'El usuario especificado no fue encontrado.',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description:
            'Error interno del servidor al intentar eliminar el usuario.',
        }),
      );
    default:
      return applyDecorators();
  }
}
