import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { TipoGaleriasService } from './tipo-galerias.service';
import { CreateTipoGaleriaDto } from './dto/create-tipo-galeria.dto';
import { UpdateTipoGaleriaDto } from './dto/update-tipo-galeria.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../modules/auth/guard/auth.guard';
import { SwaggerDocumentation } from '../../common/decorators/swagger-tipoGaleria.decorator';

@UseGuards(AuthGuard)
@Controller('tipo-galerias')
@ApiTags('Tipo-Galerias')
@ApiBearerAuth()
export class TipoGaleriasController {
  constructor(private readonly tipoGaleriasService: TipoGaleriasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear un nuevo tipo de galeria')
  async create(@Body() createTipoGaleriaDto: CreateTipoGaleriaDto) {
    try {
      const tipoGaleria =
        await this.tipoGaleriasService.create(createTipoGaleriaDto);
      return {
        message: 'Tipo Galeria creada correctamente',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: tipoGaleria,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todos los tipos de galerias')
  async findAll() {
    try {
      const tipoGaleria = await this.tipoGaleriasService.findAll();
      return {
        message: 'Tipos de Galerias encontradas correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: tipoGaleria,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener un tipo galeria por ID')
  async findOne(@Param('id') id: string) {
    try {
      const tipoGaleria = await this.tipoGaleriasService.findOne(
        this.validarId(+id),
      );
      return {
        message: 'Tipo de Galeria encontrada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: tipoGaleria,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar un tipo galeria existente')
  async update(
    @Param('id') id: string,
    @Body() updateTipoGaleriaDto: UpdateTipoGaleriaDto,
  ) {
    try {
      const tipoGaleria = await this.tipoGaleriasService.update(
        this.validarId(+id),
        updateTipoGaleriaDto,
      );
      return {
        message: 'Tipo de Galeria actualizada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: tipoGaleria,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar un tipo galeria')
  async remove(@Param('id') id: string) {
    try {
      const tipoGaleria = await this.tipoGaleriasService.remove(
        this.validarId(+id),
      );
      return {
        message: 'Tipo de Galeria eliminada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: tipoGaleria,
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
