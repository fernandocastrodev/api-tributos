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
import { ImagenesService } from './imagenes.service';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { UpdateImagenDto } from './dto/update-imagen.dto';
import { SwaggerDocumentation } from '../../common/decorators/swagger-imagen.decorator';
import { AuthGuard } from '../../modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('imagenes')
@ApiTags('Imagenes')
@ApiBearerAuth()
export class ImagenesController {
  constructor(private readonly imagenesService: ImagenesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear una nueva imagen')
  async create(@Body() createImagenDto: CreateImagenDto) {
    try {
      const imagen = await this.imagenesService.create(createImagenDto);
      return {
        message: 'Imagen creada correctamente',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: imagen,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todas las imagenes')
  async findAll() {
    try {
      const imagen = await this.imagenesService.findAll();
      return {
        message: 'Imagenes encontradas correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: imagen,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener imegen por ID')
  async findOne(@Param('id') id: string) {
    try {
      const imagen = await this.imagenesService.findOne(this.validarId(+id));
      return {
        message: 'Imagen encontrada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: imagen,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar una imegen por su ID')
  async update(
    @Param('id') id: string,
    @Body() updateImagenDto: UpdateImagenDto,
  ) {
    try {
      const imagen = await this.imagenesService.update(
        this.validarId(+id),
        updateImagenDto,
      );
      return {
        message: 'Imagen actualizada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: imagen,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar una imegen por su ID')
  async remove(@Param('id') id: string) {
    try {
      const imagen = await this.imagenesService.remove(this.validarId(+id));
      return {
        message: 'Imagen eliminada correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: imagen,
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
