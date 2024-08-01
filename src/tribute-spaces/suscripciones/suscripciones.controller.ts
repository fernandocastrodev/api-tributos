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
  BadRequestException,
} from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto';
import { UpdateSuscripcionDto } from './dto/update-suscripcion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-suscripcion.decorator';
import { AuthGuard } from '../../modules/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('suscripciones')
@ApiTags('Suscripciones')
@ApiBearerAuth()
export class SuscripcionesController {
  constructor(private readonly suscripcionesService: SuscripcionesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear una nueva suscripcion')
  async create(@Body() createSuscripcionDto: CreateSuscripcionDto) {
    try {
      const suscripcion =
        await this.suscripcionesService.create(createSuscripcionDto);
      return {
        message: 'Suscripcion creada correctamente',
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
  @SwaggerDocumentation('findAll', 'Obtener todos los planes')
  async findAll() {
    try {
      const suscripcion = await this.suscripcionesService.findAll();
      return {
        message: 'Suscripciones encontradas correctamente',
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
  @SwaggerDocumentation('findOne', 'Obtener suscripcion por ID')
  async findOne(@Param('id') id: string) {
    try {
      const suscripcion = await this.suscripcionesService.findOne(
        this.validarId(+id),
      );
      return {
        message: 'Suscripcion encontrada correctamente',
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
  @SwaggerDocumentation('update', 'Actualizar una suscripcion por su ID')
  async update(
    @Param('id') id: string,
    @Body() updateSuscripcionDto: UpdateSuscripcionDto,
  ) {
    try {
      const suscripcion = await this.suscripcionesService.update(
        this.validarId(+id),
        updateSuscripcionDto,
      );
      return {
        message: 'Suscripcion actualizada correctamente',
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
  @SwaggerDocumentation('remove', 'Eliminar una suscripcion por su ID')
  async remove(@Param('id') id: string) {
    try {
      const suscripcion = await this.suscripcionesService.remove(
        this.validarId(+id),
      );
      return {
        message: 'Suscripcion eliminada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: suscripcion,
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
