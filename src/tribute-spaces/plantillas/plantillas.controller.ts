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
  BadRequestException,
} from '@nestjs/common';
import { PlantillasService } from './plantillas.service';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto';
import { AuthGuard } from '../../modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-plantilla.decorator';

@UseGuards(AuthGuard)
@Controller('plantillas')
@ApiTags('Plantillas')
@ApiBearerAuth()
export class PlantillasController {
  constructor(private readonly plantillasService: PlantillasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear una nueva plantilla')
  async create(@Body() createPlantillaDto: CreatePlantillaDto) {
    try {
      const plantilla = await this.plantillasService.create(createPlantillaDto);
      return {
        message: 'Plantilla creada con éxito',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: plantilla,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todas las plantillas')
  async findAll() {
    try {
      const plantilla = await this.plantillasService.findAll();
      return {
        message: 'Plantillas encontradas correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: plantilla,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener plantilla por ID')
  async findOne(@Param('id') id: string) {
    try {
      const plantilla = await this.plantillasService.findOne(
        this.validarId(+id),
      );
      return {
        message: 'Plantilla encontrada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: plantilla,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar una plantilla por su ID')
  async update(
    @Param('id') id: string,
    @Body() updatePlantillaDto: UpdatePlantillaDto,
  ) {
    try {
      const plantilla = await this.plantillasService.update(
        this.validarId(+id),
        updatePlantillaDto,
      );
      return {
        message: 'Plantilla actualizada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: plantilla,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar una plantilla por su ID')
  async remove(@Param('id') id: string) {
    try {
      const plantilla = await this.plantillasService.remove(
        this.validarId(+id),
      );
      return {
        message: 'Plantilla eliminada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: plantilla,
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
