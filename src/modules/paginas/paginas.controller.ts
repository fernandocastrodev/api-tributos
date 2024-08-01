import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { PaginasService } from './paginas.service';
import { CreatePaginaDto } from './dto/create-pagina.dto';
import { UpdatePaginaDto } from './dto/update-pagina.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-pagina.decorator';

@UseGuards(AuthGuard)
@Controller('paginas')
@ApiTags('Paginas')
@ApiBearerAuth()
export class PaginasController {
  constructor(private readonly paginasService: PaginasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear una nueva pagina')
  async create(@Body() createPaginaDto: CreatePaginaDto) {
    try {
      const pagina = await this.paginasService.create(createPaginaDto);
      return {
        message: 'Pagina creada con éxito',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: pagina,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todas las paginas')
  async findAll() {
    try {
      const pagina = await this.paginasService.findAll();
      return {
        message: 'Paginas encontradas correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: pagina,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener un pagina por ID')
  async findOne(@Param('id') id: string) {
    try {
      const pagina = await this.paginasService.findOne(this.validarId(+id));
      return {
        message: 'Pagina encontrada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: pagina,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('name/:name')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOneByName', 'Obtener una pagina por nombre')
  async findOneName(@Param('name') name: string) {
    try {
      const pagina = await this.paginasService.findOneName(name);
      return {
        message: 'Pagina encontrada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: pagina,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar una pagina existente')
  async update(
    @Param('id') id: string,
    @Body() updatePaginaDto: UpdatePaginaDto,
  ) {
    try {
      const pagina = await this.paginasService.update(
        this.validarId(+id),
        updatePaginaDto,
      );
      return {
        message: 'Pagina actualizada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: pagina,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar una pagina')
  async remove(@Param('id') id: string) {
    try {
      const pagina = await this.paginasService.remove(this.validarId(+id));
      return {
        message: 'Pagina eliminada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: pagina,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  validarId(id: any) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException('id must be an integer number');
    }
    return id;
  }
}
