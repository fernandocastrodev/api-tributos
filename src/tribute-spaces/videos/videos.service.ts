import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './video.entity';
import { Repository } from 'typeorm';
import { Galeria } from '../galerias/galeria.entity';
import { plainToInstance } from 'class-transformer';
import { FindVideoDto } from './dto/find-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly VideoRepository: Repository<Video>,
    @InjectRepository(Galeria)
    private readonly GaleriaRepository: Repository<Galeria>,
  ) {}

  async create(createVideoDto: CreateVideoDto) {
    const galeria = await this.GaleriaRepository.findOneBy({
      idGaleria: createVideoDto.idGaleria,
    });

    if (!galeria) {
      throw new NotFoundException('galeria no encontrada');
    }

    const video = {
      ...createVideoDto,
      galeria,
    };

    const videoCreado = await this.VideoRepository.save(video);
    return {
      id: videoCreado.idVideo,
      url: videoCreado.url,
    };
  }

  async findAll() {
    const video = await this.VideoRepository.find();
    if (video.length === 0) {
      throw new NotFoundException('videos no encontrados');
    }
    return plainToInstance(FindVideoDto, video, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(idVideo: number) {
    const video = await this.VideoRepository.findOneBy({
      idVideo,
    });
    if (!video) {
      throw new NotFoundException('video no encontrado');
    }
    return plainToInstance(FindVideoDto, video, {
      excludeExtraneousValues: true,
    });
  }

  async update(idVideo: number, updateVideoDto: UpdateVideoDto) {
    const video = await this.VideoRepository.findOneBy({
      idVideo,
    });
    if (!video) {
      throw new NotFoundException('video no encontrado');
    }

    const galeria = await this.GaleriaRepository.findOneBy({
      idGaleria: updateVideoDto.idGaleria,
    });

    if (!galeria) {
      throw new NotFoundException('galeria no encontrada');
    }

    await this.VideoRepository.save({
      ...video,
      ...updateVideoDto,
      galeria,
    });
    const videoActualizado = await this.VideoRepository.findOneBy({
      idVideo,
    });

    return {
      id: videoActualizado.idVideo,
      url: videoActualizado.url,
    };
  }

  async remove(idVideo: number) {
    const video = await this.VideoRepository.findOneBy({
      idVideo,
    });
    if (!video) {
      throw new NotFoundException('video no encontrado');
    }
    await this.VideoRepository.softDelete(idVideo);

    return {
      id: video.idVideo,
      url: video.url,
    };
  }
}
