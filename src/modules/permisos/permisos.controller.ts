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
import { PermisosService } from './permisos.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-permiso.decorator';

@UseGuards(AuthGuard)
@Controller('permisos')
@ApiTags('Permisos')
@ApiBearerAuth()
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear un nuevo permiso')
  async create(@Body() createPermisoDto: CreatePermisoDto) {
    try {
      const permiso = await this.permisosService.create(createPermisoDto);
      return {
        message: 'Permiso creado con éxito',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: permiso,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todos los permisos')
  async findAll() {
    try {
      const permiso = await this.permisosService.findAll();
      return {
        message: 'Permisos encontrados correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: permiso,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener permiso por ID')
  async findOne(@Param('id') id: string) {
    try {
      const permiso = await this.permisosService.findOne(id);
      return {
        message: 'Permiso encontrado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: permiso,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar un permiso por su ID')
  async update(
    @Param('id') id: string,
    @Body() updatePermisoDto: UpdatePermisoDto,
  ) {
    try {
      const permiso = await this.permisosService.update(
        id,
        updatePermisoDto,
      );
      return {
        message: 'Permiso actualizado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: permiso,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar un permiso por su ID')
  async remove(@Param('id') id: string) {
    try {
      const permiso = await this.permisosService.remove(id);
      return {
        message: 'Permiso eliminado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: permiso,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
