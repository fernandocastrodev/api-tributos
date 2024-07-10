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
import { PaginasService } from './paginas.service';
import { CreatePaginaDto } from './dto/create-pagina.dto';
import { UpdatePaginaDto } from './dto/update-pagina.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-pagina.decorator';

@UseGuards(AuthGuard)
@Controller('paginas')
@ApiTags('Paginas')
export class PaginasController {
  constructor(private readonly paginasService: PaginasService) {}

  @Post()
  @SwaggerDocumentation('create', 'Crear una nueva pagina')
  async create(@Body() createPaginaDto: CreatePaginaDto) {
    try {
      return await this.paginasService.create(createPaginaDto);
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
            error: `Hubo un error interno del servidor, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get()
  @SwaggerDocumentation('findAll', 'Obtener todas las paginas')
  async findAll() {
    try {
      return await this.paginasService.findAll();
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
            error: `Hubo un error al obtener las paginas, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('id/:id')
  @SwaggerDocumentation('findOne', 'Obtener un pagina por ID')
  async findOne(@Param('id') id: string) {
    try {
      return await this.paginasService.findOne(+id);
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
            error: `Hubo un error al obtener la pagina con id ${id}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('name/:name')
  @SwaggerDocumentation('findOneByName', 'Obtener una pagina por nombre')
  async findOneName(@Param('name') name: string) {
    try {
      return await this.paginasService.findOneName(name);
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
            error: `Hubo un error al obtener la pagina con nombre ${name}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch(':id')
  @SwaggerDocumentation('update', 'Actualizar una pagina existente')
  async update(
    @Param('id') id: string,
    @Body() updatePaginaDto: UpdatePaginaDto,
  ) {
    try {
      return await this.paginasService.update(+id, updatePaginaDto);
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
              error: `Hubo un error al actualizar la pagina con id ${id}, ${error.message}`,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
  }

  @Delete(':id')
  @SwaggerDocumentation('remove', 'Eliminar una pagina')
  async remove(@Param('id') id: string) {
    try {
      return await this.paginasService.remove(+id);
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
            error: `Hubo un error al eliminar la página con ID ${id}, ${error.message}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
