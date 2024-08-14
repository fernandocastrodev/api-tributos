import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreateTributoDto } from '../../tribute-spaces/tributos/dto/create-tributo.dto';

export function SwaggerDocumentation(method: string, description: string) {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Crear un nuevo tributo' }),
        ApiBody({
          description: 'Datos necesarios para crear un tributo',
          type: CreateTributoDto,
        }),
        ApiResponse({
          status: HttpStatus.CREATED,
          description: 'Tributo creado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'Datos como idsuscripcion no encontrados',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findAll':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener todos los tributos' }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Tributos encontrados correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'tributos no encontrados',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'findOne':
      return applyDecorators(
        ApiOperation({ summary: 'Obtener tributo por ID' }),
        ApiParam({
          name: 'id',
          description: 'ID del tributo por buscar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Tributo encontrado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'tributo no encontrado',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

      case 'findTributosGalerias':
        return applyDecorators(
          ApiOperation({ summary: 'Obtener galerias por idTributo' }),
          ApiParam({
            name: 'idTributo',
            description: 'ID del tributo por buscar',
          }),
          ApiResponse({
            status: HttpStatus.OK,
            description: 'Tributos con galerias encontradas',
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
        ApiOperation({ summary: 'Actualizar un tributo por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID del tributo por actualizar',
        }),
        ApiBody({
          description: 'Datos necesarios para actualizar un tributo',
          type: CreateTributoDto,
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Tributo actualizado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.BAD_REQUEST,
          description: 'Datos de entrada no son válidos o existentes',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'tributo o suscripcion no encontrada',
        }),
        ApiResponse({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Hubo un error interno del servidor',
        }),
      );

    case 'remove':
      return applyDecorators(
        ApiOperation({ summary: 'Eliminar un tributo por su ID' }),
        ApiParam({
          name: 'id',
          description: 'ID del tributo por eliminar',
        }),
        ApiResponse({
          status: HttpStatus.OK,
          description: 'Tributo eliminado correctamente',
        }),
        ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'tributo no encontrado',
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
