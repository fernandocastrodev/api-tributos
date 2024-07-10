import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpException,
  HttpStatus,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-usuario.decorator';

@UseGuards(AuthGuard)
@Controller('usuarios')
@ApiTags('Usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @SwaggerDocumentation('create', 'Crear un nuevo usuario')
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      return await this.usuariosService.create(createUsuarioDto);
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
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
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
  @SwaggerDocumentation('findAll', 'Obtener todos los usuarios')
  async findAll() {
    try {
      return await this.usuariosService.findAll();
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
            error: `Hubo un error al obtener los usuarios, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('id/:id')
  @SwaggerDocumentation('findOne', 'Obtener un usuario por ID')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usuariosService.findOne(+id);
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
            error: `Hubo un error al obtener el usuario con id ${id}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('rut/:rut')
  @SwaggerDocumentation('findOneByRut', 'Obtener un usuario por RUT')
  async findOneRut(@Param('rut') rut: string) {
    try {
      return await this.usuariosService.findOneByRut(rut);
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
            error: `Hubo un error al obtener el usuario con id ${rut}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch(':id')
  @SwaggerDocumentation('update', 'Actualizar un usuario existente')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    try {
      return await this.usuariosService.update(+id, updateUsuarioDto);
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
            error: `Hubo un error al actualizar el usuario con id ${id}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':id')
  @SwaggerDocumentation('remove', 'Eliminar un usuario')
  async remove(@Param('id') id: string) {
    try {
      return await this.usuariosService.remove(+id);
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
            error: `Hubo un error al eliminar el usuario con id ${id}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
