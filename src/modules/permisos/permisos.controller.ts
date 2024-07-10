import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpException,
  HttpStatus,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-permiso.decorator';

@UseGuards(AuthGuard)
@Controller('permisos')
@ApiTags('Permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @Post()
  @SwaggerDocumentation('create', 'Crear un nuevo permiso')
  async create(@Body() createPermisoDto: CreatePermisoDto) {
    try {
      return await this.permisosService.create(createPermisoDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `Hubo un error interno del servidor, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get()
  @SwaggerDocumentation('findAll', 'Obtener todos los permisos')
  async findAll() {
    try {
      return await this.permisosService.findAll();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `Error al obtener los permisos, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get(':id')
  @SwaggerDocumentation('findOne', 'Obtener permiso por ID')
  async findOne(@Param('id') id: string) {
    try {
      return await this.permisosService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `Hubo un error al buscar el permiso con id ${id}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch(':id')
  @SwaggerDocumentation('update', 'Actualizar un permiso por su ID')
  async update(
    @Param('id') id: string,
    @Body() updatePermisoDto: UpdatePermisoDto,
  ) {
    try {
      return await this.permisosService.update(+id, updatePermisoDto);
    } catch (error) {
      {
        if (error instanceof NotFoundException) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
            },
            HttpStatus.BAD_REQUEST,
          );
        } else if (error instanceof BadRequestException) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
            },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: `Hubo un error al actualizar el permiso con id ${id}, ${error.message}`,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
  }

  @Delete(':id')
  @SwaggerDocumentation('remove', 'Eliminar un permiso por su ID')
  async remove(@Param('id') id: string) {
    try {
      return await this.permisosService.remove(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `Hubo un error al eliminar el permiso con id ${id}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
