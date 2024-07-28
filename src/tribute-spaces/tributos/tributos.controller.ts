import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TributosService } from './tributos.service';
import { CreateTributoDto } from './dto/create-tributo.dto';
import { UpdateTributoDto } from './dto/update-tributo.dto';
import { AuthGuard } from '../../modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from 'src/common/decorators/swagger-tributo.decorator';

@UseGuards(AuthGuard)
@Controller('tributos')
@ApiTags('Tributos')
@ApiBearerAuth()
export class TributosController {
  constructor(private readonly tributosService: TributosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear un nuevo tributo')
  async create(@Body() createTributoDto: CreateTributoDto) {
    try {
      const tributo = await this.tributosService.create(createTributoDto);
      return {
        message: 'Tributo creado correctamente',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: tributo,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todos los tributos')
  async findAll() {
    try {
      const tributo = await this.tributosService.findAll();
      return {
        message: 'Tributos encontrados correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: tributo,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener tributo por ID')
  async findOne(@Param('id') id: string) {
    try {
      const tributo = await this.tributosService.findOne(+id);
      return {
        message: 'Tributo encontrado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: tributo,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar un tributo por su ID')
  async update(
    @Param('id') id: string,
    @Body() updateTributoDto: UpdateTributoDto,
  ) {
    try {
      const tributo = await this.tributosService.update(+id, updateTributoDto);
      return {
        message: 'Tributo actualizado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: tributo,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar un tributo por su ID')
  async remove(@Param('id') id: string) {
    try {
      const tributo = await this.tributosService.remove(+id);
      return {
        message: 'Tributo eliminado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: tributo,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
