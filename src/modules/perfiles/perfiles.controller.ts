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
} from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-perfil.decorator';

@UseGuards(AuthGuard)
@Controller('perfiles')
@ApiTags('Perfiles')
@ApiBearerAuth()
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear un nuevo perfil')
  async create(@Body() createPerfilDto: CreatePerfilDto) {
    try {
      const perfil = await this.perfilesService.create(createPerfilDto);
      return {
        message: 'Perfil creado con éxito',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: perfil,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todos los perfiles')
  async findAll() {
    try {
      const perfil = await this.perfilesService.findAll();
      return {
        message: 'Perfiles encontrados correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: perfil,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener un perfil por ID')
  async findOne(@Param('id') id: string) {
    try {
      const perfil = await this.perfilesService.findOne(+id);
      return {
        message: 'Perfil encontrado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: perfil,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('name/:name')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOneByName', 'Obtener un perfil por nombre')
  async findOneName(@Param('name') name: string) {
    try {
      const perfil = await this.perfilesService.findOneName(name);
      return {
        message: 'Perfil encontrado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: perfil,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar un perfil existente')
  async update(
    @Param('id') id: string,
    @Body() updatePerfilDto: UpdatePerfilDto,
  ) {
    try {
      const perfil = await this.perfilesService.update(+id, updatePerfilDto);
      return {
        message: 'Perfil actualizado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: perfil,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar un perfil')
  async remove(@Param('id') id: string) {
    try {
      const perfil = await this.perfilesService.remove(+id);
      return {
        message: 'Perfil eliminado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: perfil,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
