import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TributosService } from './tributos.service';
import { CreateTributoDto } from './dto/create-tributo.dto';
import { UpdateTributoDto } from './dto/update-tributo.dto';

@Controller('tributos')
export class TributosController {
  constructor(private readonly tributosService: TributosService) {}

  @Post()
  create(@Body() createTributoDto: CreateTributoDto) {
    return this.tributosService.create(createTributoDto);
  }

  @Get()
  findAll() {
    return this.tributosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tributosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTributoDto: UpdateTributoDto) {
    return this.tributosService.update(+id, updateTributoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tributosService.remove(+id);
  }
}
