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
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { AuthGuard } from '../../modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-video.decorator';

@UseGuards(AuthGuard)
@Controller('videos')
@ApiTags('Videos')
@ApiBearerAuth()
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear un nuevo video')
  async create(@Body() createVideoDto: CreateVideoDto) {
    try {
      const video = await this.videosService.create(createVideoDto);
      return {
        message: 'Video creado correctamente',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: video,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todos los videos')
  async findAll() {
    try {
      const video = await this.videosService.findAll();
      return {
        message: 'Videos encontrados correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: video,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener video por ID')
  async findOne(@Param('id') id: string) {
    try {
      const video = await this.videosService.findOne(id);
      return {
        message: 'Video encontrado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: video,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar un video por su ID')
  async update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    try {
      const video = await this.videosService.update(
        id,
        updateVideoDto,
      );
      return {
        message: 'Video actualizado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: video,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar un video por su ID')
  async remove(@Param('id') id: string) {
    try {
      const video = await this.videosService.remove(id);
      return {
        message: 'Video eliminado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: video,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

}
