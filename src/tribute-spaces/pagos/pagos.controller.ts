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
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { AuthGuard } from '../../modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from 'src/common/decorators/swagger-pago.decorator';

@UseGuards(AuthGuard)
@Controller('pagos')
@ApiTags('Pagos')
@ApiBearerAuth()
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear un nuevo pago')
  async create(@Body() createPagoDto: CreatePagoDto) {
    try {
      const pago = await this.pagosService.create(createPagoDto);
      return {
        message: 'Pago creado con éxito',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: pago,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todos los pagos')
  async findAll() {
    const pago = await this.pagosService.findAll();
    try {
      return {
        message: 'Pagos encontrados correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: pago,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener pago por ID')
  async findOne(@Param('id') id: string) {
    const pago = await this.pagosService.findOne(this.validarId(+id));
    try {
      return {
        message: 'Pago encontrado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: pago,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('pagos/:pagos')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation(
    'findPagoBySuscripcion',
    'Obtener pago por idSuscripcion',
  )
  async findPagoBySuscripcion(@Param('pagos') id: string) {
    const pago = await this.pagosService.findPagoBySuscripcion(
      this.validarId(+id),
    );
    try {
      return {
        message: 'Pagos encontrados por suscripcion',
        error: null,
        statusCode: HttpStatus.OK,
        Data: pago,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar un pago por su ID')
  async update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
    const pago = this.pagosService.update(this.validarId(+id), updatePagoDto);
    try {
      return {
        message: 'Pago actualizado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: pago,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar un pago por su ID')
  async remove(@Param('id') id: string) {
    const pago = this.pagosService.remove(this.validarId(+id));
    try {
      return {
        message: 'Pago eliminado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: pago,
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
