import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-perfil.decorator';

@UseGuards(AuthGuard)
@Controller('perfiles')
@ApiTags('Perfiles')
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) {}

  @Post()
  @SwaggerDocumentation('create', 'Crear un nuevo perfil')
  async create(@Body() createPerfilDto: CreatePerfilDto) {
    try {
      return await this.perfilesService.create(createPerfilDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
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
            error: `Hubo un error al crear el perfil, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  @Get()
  @SwaggerDocumentation('findAll', 'Obtener todos los perfiles')
  async findAll() {
    try {
      return await this.perfilesService.findAll();
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
            error: `Hubo un error al obtener los perfiles, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('id/:id')
  @SwaggerDocumentation('findOne', 'Obtener un perfil por ID')
  async findOne(@Param('id') id: string) {
    try {
      return await this.perfilesService.findOne(+id);
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
            error: `Hubo un error al obtener el perfil con id ${id}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('name/:name')
  @SwaggerDocumentation('findOneByName', 'Obtener un perfil por nombre')
  async findOneName(@Param('name') name: string) {
    try {
      return await this.perfilesService.findOneName(name);
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
            error: `Hubo un error al obtener el perfil con id ${name}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch(':id')
  @SwaggerDocumentation('update', 'Actualizar un perfil existente')
  async update(
    @Param('id') id: string,
    @Body() updatePerfilDto: UpdatePerfilDto,
  ) {
    try {
      return await this.perfilesService.update(+id, updatePerfilDto);
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
            error: `Hubo un error al actualizar el perfil con id ${id}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':id')
  @SwaggerDocumentation('remove', 'Eliminar un perfil')
  async remove(@Param('id') id: string) {
    try {
      return await this.perfilesService.remove(+id);
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
            error: `Hubo un error al eliminar el perfil con id ${id}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
