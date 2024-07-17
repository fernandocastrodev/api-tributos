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
} from '@nestjs/common';
import { ContactosService } from './contactos.service';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerDocumentation } from '../../common/decorators/swagger-contacto.decorator';

@Controller('contactos')
@ApiTags('Contactos')
export class ContactosController {
  constructor(private readonly contactosService: ContactosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDocumentation('create', 'Crear un nuevo contacto')
  async create(@Body() createContactoDto: CreateContactoDto) {
    try {
      const contacto = await this.contactosService.create(createContactoDto);
      return {
        message: 'Contacto creado con éxito',
        error: null,
        statusCode: HttpStatus.CREATED,
        Data: contacto,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findAll', 'Obtener todos los contactos')
  async findAll() {
    try {
      const contacto = await this.contactosService.findAll();
      return {
        message: 'Contactos encontrados correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: null,
        DataList: contacto,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('findOne', 'Obtener contacto por ID')
  async findOne(@Param('id') id: string) {
    try {
      const contacto = await this.contactosService.findOne(+id);
      return {
        message: 'Contacto encontrado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: contacto,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('update', 'Actualizar un contacto por su ID')
  async update(
    @Param('id') id: string,
    @Body() updateContactoDto: UpdateContactoDto,
  ) {
    try {
      const contacto = await this.contactosService.update(
        +id,
        updateContactoDto,
      );
      return {
        message: 'Contacto actualizado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: contacto,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerDocumentation('remove', 'Eliminar un contacto por su ID')
  async remove(@Param('id') id: string) {
    try {
      const contacto = await this.contactosService.remove(+id);
      return {
        message: 'Contacto eliminado correctamente',
        error: null,
        statusCode: HttpStatus.OK,
        Data: contacto,
        DataList: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
