import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TextosService } from './textos.service';
import { CreateTextoDto } from './dto/create-texto.dto';
import { UpdateTextoDto } from './dto/update-texto.dto';
import { AuthGuard } from '../../modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-texto.decorator';

@UseGuards(AuthGuard)
@Controller('textos')
@ApiTags('Textos')
@ApiBearerAuth()
export class TextosController {
  constructor(private readonly textosService: TextosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear un nuevo texto')
  async create(@Body() createTextoDto: CreateTextoDto) {
    try {
      const texto = await this.textosService.create(createTextoDto);
      return {
        message: 'Texto creado correctamente',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: texto,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todos los textos')
  async findAll() {
    try {
      const texto = await this.textosService.findAll();
      return {
        message: 'Textos encontrados correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: texto,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener texto por ID')
  async findOne(@Param('id') id: string) {
    try {
      const texto = await this.textosService.findOne(id);
      return {
        message: 'Texto encontrado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: texto,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar un texto por su ID')
  async update(
    @Param('id') id: string,
    @Body() updateTextoDto: UpdateTextoDto,
  ) {
    try {
      const texto = await this.textosService.update(
        id,
        updateTextoDto,
      );
      return {
        message: 'Texto actualizado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: texto,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar un texto por su ID')
  async remove(@Param('id') id: string) {
    try {
      const texto = await this.textosService.remove(id);
      return {
        message: 'Texto eliminado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: texto,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

}
