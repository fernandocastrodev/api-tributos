import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTributoDto } from './dto/create-tributo.dto';
import { UpdateTributoDto } from './dto/update-tributo.dto';
import { Tributo } from './tributo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Suscripcion } from '../suscripciones/suscripcion.entity';
import { plainToInstance } from 'class-transformer';
import { FindTributoDto } from './dto/find-tributo.dto';

@Injectable()
export class TributosService {
  constructor(
    @InjectRepository(Tributo)
    private readonly TributoRepository: Repository<Tributo>,
    @InjectRepository(Suscripcion)
    private readonly SuscripcionRepository: Repository<Suscripcion>,
  ) {}
  async create(createTributoDto: CreateTributoDto) {
    const suscripcion = await this.SuscripcionRepository.findOneBy({
      idSuscripcion: createTributoDto.idSubscripcion,
      estadoSuscripcion:true,
    });
    if (!suscripcion) {
      throw new NotFoundException('suscripcion no encontrada');
    }

    const tributo = {
      ...createTributoDto,
      suscripcion,
    };

    const tributoCreado = await this.TributoRepository.save(tributo);

    return {
      id: tributoCreado.idTributo,
      nombreTributo: `${tributoCreado.nombre} ${tributoCreado.apellido}`,
    };
  }

  async findAll() {
    const tributo = await this.TributoRepository.find();

    if (tributo.length === 0) {
      throw new NotFoundException('tributos no encontrados');
    }
    return plainToInstance(FindTributoDto, tributo, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(idTributo: number) {
    const tributo = await this.TributoRepository.findOneBy({
      idTributo,
    });

    if (!tributo) {
      throw new NotFoundException('tributo no encontrado');
    }

    return plainToInstance(FindTributoDto, tributo, {
      excludeExtraneousValues: true,
    });
  }

  async update(idTributo: number, updateTributoDto: UpdateTributoDto) {
    const tributo = await this.TributoRepository.findOneBy({ idTributo });
    if (!tributo) {
      throw new NotFoundException('tributo no encontrado');
    }

    const suscripcion = await this.SuscripcionRepository.findOneBy({
      idSuscripcion: updateTributoDto.idSubscripcion,
      estadoSuscripcion:true,
    });

    if (!suscripcion) {
      throw new NotFoundException('suscricion no encontrada');
    }

    await this.TributoRepository.save({
      ...tributo,
      ...updateTributoDto,
      suscripcion,
    });

    const tributoActualizado = await this.TributoRepository.findOneBy({
      idTributo,
    });

    return {
      id: tributoActualizado.idTributo,
      nombreTributo: `${tributoActualizado.nombre} ${tributoActualizado.apellido}`,
    };
  }

  async remove(idTributo: number) {
    const tributo = await this.TributoRepository.findOneBy({
      idTributo,
    });
    if (!tributo) {
      throw new NotFoundException('tributo no encontrado');
    }
    await this.TributoRepository.softDelete({ idTributo });
    return {
      id: tributo.idTributo,
      nombreTributo: `${tributo.nombre} ${tributo.apellido}`,
    };
  }
}
