import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpStatus,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-usuario.decorator';

@UseGuards(AuthGuard)
@Controller('usuarios')
@ApiTags('Usuarios')
@ApiBearerAuth()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear un nuevo usuario')
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuario = await this.usuariosService.create(createUsuarioDto);
      return {
        message: 'Usuario creado con éxito',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: usuario,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todos los usuarios')
  async findAll() {
    try {
      const usuarios = await this.usuariosService.findAll();
      return {
        message: 'Usuarios encontrados correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: usuarios,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener un usuario por ID')
  async findOne(@Param('id') id: string) {
    try {
      const usuario = await this.usuariosService.findOne(+id);
      return {
        message: 'Usuario encontrado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: usuario,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('rut/:rut')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOneByRut', 'Obtener un usuario por RUT')
  async findOneRut(@Param('rut') rut: string) {
    try {
      const usuario = await this.usuariosService.findOneByRut(rut);
      return {
        message: 'Usuario encontrado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: usuario,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar un usuario existente')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    try {
      const usuario = await this.usuariosService.update(+id, updateUsuarioDto);
      return {
        message: 'Usuario actualizado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: usuario,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar un usuario')
  async remove(@Param('id') id: string) {
    try {
      const usuario = await this.usuariosService.remove(+id);
      return {
        message: 'Usuario eliminado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: usuario,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
