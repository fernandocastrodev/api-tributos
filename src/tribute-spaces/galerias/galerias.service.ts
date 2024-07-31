import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGaleriaDto } from './dto/create-galeria.dto';
import { UpdateGaleriaDto } from './dto/update-galeria.dto';
import { Not, Repository } from 'typeorm';
import { Galeria } from './galeria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoGaleria } from '../tipo-galerias/tipo-galeria.entity';
import { Tributo } from '../tributos/tributo.entity';
import { plainToInstance } from 'class-transformer';
import { FindGaleriaDto } from './dto/find-galeria.dto';

@Injectable()
export class GaleriasService {
  constructor(
    @InjectRepository(Galeria)
    private readonly GaleriaRepository: Repository<Galeria>,
    @InjectRepository(TipoGaleria)
    private readonly TipoGaleriaRepository: Repository<TipoGaleria>,
    @InjectRepository(Tributo)
    private readonly TributoRepository: Repository<Tributo>,
  ) {}
  async create(createGaleriaDto: CreateGaleriaDto) {
    const tipoGaleria = await this.TipoGaleriaRepository.findOneBy({
      idTipoGaleria: createGaleriaDto.idTipoGaleria,
    });

    if (!tipoGaleria) {
      throw new NotFoundException('tipo de galeria no encontrado');
    }

    const tributo = await this.TributoRepository.findOneBy({
      idTributo: createGaleriaDto.idTributo,
    });
    if (!tributo) {
      throw new NotFoundException('tributo no encontrado');
    }

    const ordenGaleria = await this.GaleriaRepository.findOneBy({
      orden: createGaleriaDto.orden,
    });

    if (ordenGaleria) {
      throw new BadRequestException('el orden de la galeria ya existe');
    }

    const galeria = {
      ...createGaleriaDto,
      tipoGaleria,
      tributo,
    };

    const galeriaCreada = await this.GaleriaRepository.save(galeria);
    return {
      id: galeriaCreada.idGaleria,
      idTipoGaleria: galeriaCreada.tipoGaleria.idTipoGaleria,
      idTributo: galeriaCreada.tributo.idTributo,
    };
  }

  async findAll() {
    const galeria = await this.GaleriaRepository.find({
      relations: ['tipoGaleria', 'tributo'],
    });

    if (galeria.length === 0) {
      throw new NotFoundException('galerias no encontradas');
    }

    return plainToInstance(FindGaleriaDto, galeria, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(idGaleria: number) {
    const galeria = await this.GaleriaRepository.findOneBy({
      idGaleria,
    });
    if (!galeria) {
      throw new NotFoundException('galeria no encontrada');
    }
    return plainToInstance(FindGaleriaDto, galeria, {
      excludeExtraneousValues: true,
    });
  }

  async update(idGaleria: number, updateGaleriaDto: UpdateGaleriaDto) {
    const galeria = await this.GaleriaRepository.findOneBy({
      idGaleria,
    });
    if (!galeria) {
      throw new NotFoundException('galeria no encontrada');
    }

    const TipoGaleria = await this.TipoGaleriaRepository.findOneBy({
      idTipoGaleria: updateGaleriaDto.idTipoGaleria,
    });

    if (!TipoGaleria) {
      throw new NotFoundException('tipo de galeria no encontrado');
    }

    const tributo = await this.TributoRepository.findOneBy({
      idTributo: updateGaleriaDto.idTributo,
    });
    if (!tributo) {
      throw new NotFoundException('tributo no encontrado');
    }

    const ordenGaleria = await this.GaleriaRepository.findOneBy({
      orden: updateGaleriaDto.orden,
      idGaleria: Not(idGaleria),
    });

    if (ordenGaleria) {
      throw new BadRequestException('el orden de la galeria ya existe');
    }
    await this.GaleriaRepository.save({
      ...galeria,
      ...updateGaleriaDto,
      TipoGaleria,
      tributo,
    });

    const galeriaActualizada = await this.GaleriaRepository.findOneBy({
      idGaleria,
    });
    return {
      id: galeriaActualizada.idGaleria,
      idTipoGaleria: galeriaActualizada.tipoGaleria.idTipoGaleria,
      idTributo: galeriaActualizada.tributo.idTributo,
    };
  }

  async remove(idGaleria: number) {
    const galeria = await this.GaleriaRepository.findOneBy({
      idGaleria,
    });
    if (!galeria) {
      throw new NotFoundException('galeria no encontrada');
    }

    await this.GaleriaRepository.softDelete(idGaleria);
    return {
      idGaleria: galeria.idGaleria,
      orden: galeria.orden,
    };
  }
}
