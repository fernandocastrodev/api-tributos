import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTextoDto } from './dto/create-texto.dto';
import { UpdateTextoDto } from './dto/update-texto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Texto } from './texto.entity';
import { Repository } from 'typeorm';
import { Galeria } from '../galerias/galeria.entity';
import { plainToInstance } from 'class-transformer';
import { FindTextoDto } from './dto/find-texto.dto';

@Injectable()
export class TextosService {
  constructor(
    @InjectRepository(Texto)
    private readonly TextoRepository: Repository<Texto>,
    @InjectRepository(Galeria)
    private readonly GaleriaRepository: Repository<Galeria>,
  ) {}
  async create(createTextoDto: CreateTextoDto) {
    const galeria = await this.GaleriaRepository.findOneBy({
      idGaleria: createTextoDto.idGaleria,
    });

    if (!galeria) {
      throw new NotFoundException('galeria no encontrada');
    }

    const video = {
      ...createTextoDto,
      galeria,
    };

    const textoCreado = await this.TextoRepository.save(video);
    return {
      id: textoCreado.idTexto,
      tipoTexto: textoCreado.tipoTexto,
    };
  }

  async findAll() {
    const texto = await this.TextoRepository.find();
    if (texto.length === 0) {
      throw new NotFoundException('textos no encontrados');
    }
    return plainToInstance(FindTextoDto, texto, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(idTexto: number) {
    const texto = await this.TextoRepository.findOneBy({
      idTexto,
    });
    if (!texto) {
      throw new NotFoundException('texto no encontrado');
    }
    return plainToInstance(FindTextoDto, texto, {
      excludeExtraneousValues: true,
    });
  }

  async update(idTexto: number, updateTextoDto: UpdateTextoDto) {
    const texto = await this.TextoRepository.findOneBy({
      idTexto,
    });
    if (!texto) {
      throw new NotFoundException('texto no encontrado');
    }

    const galeria = await this.GaleriaRepository.findOneBy({
      idGaleria: updateTextoDto.idGaleria,
    });

    if (!galeria) {
      throw new NotFoundException('galeria no encontrada');
    }

    await this.TextoRepository.save({
      ...texto,
      ...updateTextoDto,
      galeria,
    });
    const textoActualizado = await this.TextoRepository.findOneBy({
      idTexto,
    });

    return {
      id: textoActualizado.idTexto,
      tipoTexto: textoActualizado.tipoTexto,
    };
  }

  async remove(idTexto: number) {
    const texto = await this.TextoRepository.findOneBy({
      idTexto,
    });
    if (!texto) {
      throw new NotFoundException('texto no encontrado');
    }
    await this.TextoRepository.softDelete(idTexto);

    return {
      id: texto.idTexto,
      tipoTexto: texto.tipoTexto,
    };
  }
}
