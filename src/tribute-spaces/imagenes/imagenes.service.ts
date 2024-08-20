import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { UpdateImagenDto } from './dto/update-imagen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Galeria } from '../galerias/galeria.entity';
import { Repository } from 'typeorm';
import { Imagen } from './imagen.entity';
import { plainToInstance } from 'class-transformer';
import { FindImagenDto } from './dto/find-imagen.dto';
import { FileService} from '../../common/services/files/file.service'
import * as path from 'path';

@Injectable()
export class ImagenesService {
  constructor(
    @InjectRepository(Imagen)
    private readonly ImagenRepository: Repository<Imagen>,
    @InjectRepository(Galeria)
    private readonly GaleriaRepository: Repository<Galeria>,

    private readonly fileService: FileService,
  ) {}
  async create(file: Express.Multer.File, createImagenDto: CreateImagenDto) {
    const galeria = await this.GaleriaRepository.findOneBy({
      idGaleria: createImagenDto.idGaleria,
    });

    if (!galeria) {
      throw new NotFoundException('galeria no encontrada');
    }

    // Define la ruta de la carpeta donde se guardará la imagen
    const filePath = await this.fileService.saveFile(file, createImagenDto.idUsuario, createImagenDto.idTributo)

     // Construir la URL de la imagen para almacenar en la base de datos
     const relativePath = path.relative(path.join(process.cwd(), 'public'), filePath);
     const imageUrl = `/static/${relativePath.replace(/\\/g, '/')}`;

    const imagen = {
      ...createImagenDto,
      galeria,
      url: imageUrl,
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

  async findOne(idImagen: string) {
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

  async update(idImagen: string, updateImagenDto: UpdateImagenDto) {
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

  async remove(idImagen: string) {
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
