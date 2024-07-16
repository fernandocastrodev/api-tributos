import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreateContactoDto } from '../../tribute-spaces/contactos/dto/create-contacto.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear un nuevo contacto' }),
        ApiBody({
          description: 'Datos necesarios para crear un contacto',
          type: CreateContactoDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Contacto creado con éxito',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description:
            'Datos de entrada como correo ya existentes o no son válidos',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todos los contactos' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Contactos encontrados correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'contactos no encontrados',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener contacto por ID' }),
        ApiParam({ name: 'id', description: 'ID del contacto a buscar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Contacto encontrado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'contacto no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'update':
      return applyDecorators(
        ApiOperation({ summary: 'Actualizar un contacto por su ID' }),
        ApiParam({ name: 'id', description: 'ID de la página a actualizar' }),
        ApiBody({
          description: 'Datos necesarios para actualizar un contacto',
          type: CreateContactoDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Contacto actualizado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description:
            'Datos de entrada como correo ya existentes o no son válidos',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'contacto no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar un contacto por su ID' }),
        ApiParam({ name: 'id', description: 'ID del contacto a eliminar' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Contacto eliminado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'contacto no encontrado',
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
