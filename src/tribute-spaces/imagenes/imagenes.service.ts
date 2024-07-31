import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { UpdateImagenDto } from './dto/update-imagen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Galeria } from '../galerias/galeria.entity';
import { Repository } from 'typeorm';
import { Imagen } from './imagen.entity';
import { plainToInstance } from 'class-transformer';
import { FindImagenDto } from './dto/find-imagen.dto';

@Injectable()
export class ImagenesService {
  constructor(
    @InjectRepository(Imagen)
    private readonly ImagenRepository: Repository<Imagen>,
    @InjectRepository(Galeria)
    private readonly GaleriaRepository: Repository<Galeria>,
  ) {}
  async create(createImagenDto: CreateImagenDto) {
    const galeria = await this.GaleriaRepository.findOneBy({
      idGaleria: createImagenDto.idGaleria,
    });

    if (!galeria) {
      throw new NotFoundException('galeria no encontrada');
    }

    const imagen = {
      ...createImagenDto,
      galeria,
    };
    const imagenCreada = await this.ImagenRepository.save(imagen);
    return {
      id: imagenCreada.idImagen,
      url: imagenCreada.url,
    };
  }

  async findAll() {
    const imagen = await this.ImagenRepository.find();
    if (imagen.length === 0) {
      throw new NotFoundException('imagenes no encontradas');
    }
    return plainToInstance(FindImagenDto, imagen, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(idImagen: number) {
    const imagen = await this.ImagenRepository.findOneBy({
      idImagen,
    });
    if (!imagen) {
      throw new NotFoundException('imagen no encontrada');
    }
    return plainToInstance(FindImagenDto, imagen, {
      excludeExtraneousValues: true,
    });
  }

  async update(idImagen: number, updateImagenDto: UpdateImagenDto) {
    const imagen = await this.ImagenRepository.findOneBy({
      idImagen,
    });
    if (!imagen) {
      throw new NotFoundException('imagen no encontrada');
    }

    const galeria = await this.GaleriaRepository.findOneBy({
      idGaleria: updateImagenDto.idGaleria,
    });

    if (!galeria) {
      throw new NotFoundException('galeria no encontrada');
    }

    await this.ImagenRepository.save({
      ...imagen,
      ...updateImagenDto,
      galeria,
    });
    const imagenActualizada = await this.ImagenRepository.findOneBy({
      idImagen,
    });

    return {
      id: imagenActualizada.idImagen,
      url: imagenActualizada.url,
    };
  }

  async remove(idImagen: number) {
    const imagen = await this.ImagenRepository.findOneBy({
      idImagen,
    });
    if (!imagen) {
      throw new NotFoundException('imagen no encontrada');
    }
    await this.ImagenRepository.softDelete(idImagen);

    return {
      id: imagen.idImagen,
      url: imagen.url,
    };
  }
}
