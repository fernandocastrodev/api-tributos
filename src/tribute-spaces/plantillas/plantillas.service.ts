import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto';
import { Repository } from 'typeorm';
import { Plantilla } from './plantilla.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { findOnePlantillaDto } from './dto/findOne-plantilla.dto';

@Injectable()
export class PlantillasService {
  constructor(
    @InjectRepository(Plantilla)
    private readonly PlantillaRepository: Repository<Plantilla>,
  ) {}

  async create(createPlantillaDto: CreatePlantillaDto) {
    const plantilla = await this.PlantillaRepository.save(createPlantillaDto);
    return {
      id: plantilla.idPlantilla,
      nombrePlantilla: plantilla.nombre,
    };
  }

  async findAll() {
    const plantilla = await this.PlantillaRepository.find({where: { estado: true },});
    if (plantilla.length === 0) {
      throw new NotFoundException('plantillas no encontradas');
    }
    return plantilla;
  }

  async findOne(idPlantilla: number) {
    const plantilla = await this.PlantillaRepository.findOneBy({
      idPlantilla,
      estado: true, 
    });
    if (!plantilla) {
      throw new NotFoundException('plantilla no encontrada');
    }

    return plainToInstance(findOnePlantillaDto, plantilla, {
      excludeExtraneousValues: true,
    });
  }

  async update(idPlantilla: number, updatePlantillaDto: UpdatePlantillaDto) {
    const plantilla = await this.PlantillaRepository.findOneBy({
      idPlantilla,
      estado: true, 
    });

    if (!plantilla) {
      throw new NotFoundException('plantilla no encontrada');
    }

    await this.PlantillaRepository.update(idPlantilla, updatePlantillaDto);

    const plantillaActualizada = await this.PlantillaRepository.findOneBy({
      idPlantilla,
    });
    return {
      id: plantillaActualizada.idPlantilla,
      nombrePlantilla: plantillaActualizada.nombre,
    };
  }

  async remove(idPlantilla: number) {
    const plantilla = await this.PlantillaRepository.findOneBy({
      idPlantilla,
    });
    if (!plantilla) {
      throw new NotFoundException('plantilla no encontrada');
    }
    await this.PlantillaRepository.softDelete(idPlantilla);
    return {
      id: plantilla.idPlantilla,
      nombrePlantilla: plantilla.nombre,
    };
  }
}
