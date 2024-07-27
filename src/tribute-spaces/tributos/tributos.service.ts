import { Injectable } from '@nestjs/common';
import { CreateTributoDto } from './dto/create-tributo.dto';
import { UpdateTributoDto } from './dto/update-tributo.dto';

@Injectable()
export class TributosService {
  create(createTributoDto: CreateTributoDto) {
    return 'This action adds a new tributo';
  }

  findAll() {
    return `This action returns all tributos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tributo`;
  }

  update(id: number, updateTributoDto: UpdateTributoDto) {
    return `This action updates a #${id} tributo`;
  }

  remove(id: number) {
    return `This action removes a #${id} tributo`;
  }
}
