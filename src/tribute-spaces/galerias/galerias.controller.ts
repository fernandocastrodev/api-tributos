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
import { GaleriasService } from './galerias.service';
import { CreateGaleriaDto } from './dto/create-galeria.dto';
import { UpdateGaleriaDto } from './dto/update-galeria.dto';
import { AuthGuard } from '../../modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-galeria.decorator';

@UseGuards(AuthGuard)
@Controller('galerias')
@ApiTags('Galerias')
@ApiBearerAuth()
export class GaleriasController {
  constructor(private readonly galeriasService: GaleriasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear una nueva galeria')
  async create(@Body() createGaleriaDto: CreateGaleriaDto) {
    try {
      const suscripcion = await this.galeriasService.create(createGaleriaDto);
      return {
        message: 'Galeria creada correctamente',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: suscripcion,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todas las galeria')
  async findAll() {
    try {
      const suscripcion = await this.galeriasService.findAll();
      return {
        message: 'Galerias encontradas correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: suscripcion,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener galeria por ID')
  async findOne(@Param('id') id: string) {
    try {
      const suscripcion = await this.galeriasService.findOne(+id);
      return {
        message: 'Galeria encontrada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: suscripcion,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar una galeria por su ID')
  async update(
    @Param('id') id: string,
    @Body() updateGaleriaDto: UpdateGaleriaDto,
  ) {
    try {
      const suscripcion = await this.galeriasService.update(
        +id,
        updateGaleriaDto,
      );
      return {
        message: 'Galeria actualizada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: suscripcion,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar una galeria por su ID')
  async remove(@Param('id') id: string) {
    try {
      const suscripcion = await this.galeriasService.remove(+id);
      return {
        message: 'Galeria eliminada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: suscripcion,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
