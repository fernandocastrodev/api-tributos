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
import { PlanesService } from './planes.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { AuthGuard } from '../../modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-plan.decorator';

@Controller('planes')
@ApiTags('Planes')
@ApiBearerAuth()
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear un nuevo plan')
  async create(@Body() createPlanDto: CreatePlanDto) {
    try {
      const plan = await this.planesService.create(createPlanDto);
      return {
        message: 'Plan creado con éxito',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: plan,
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
      const plan = await this.planesService.findAll();
      return {
        message: 'Planes encontrados correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: plan,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener plan por ID')
  async findOne(@Param('id') id: string) {
    try {
      const plan = await this.planesService.findOne(+id);
      return {
        message: 'Plan encontrado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: plan,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar un plan por su ID')
  async update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    try {
      const plan = await this.planesService.update(+id, updatePlanDto);
      return {
        message: 'Plan actualizado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: plan,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar un plan por su ID')
  async remove(@Param('id') id: string) {
    try {
      const plan = await this.planesService.remove(+id);
      return {
        message: 'Plan eliminado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: plan,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
