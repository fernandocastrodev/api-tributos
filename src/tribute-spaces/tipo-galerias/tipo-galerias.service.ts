import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTipoGaleriaDto } from './dto/create-tipo-galeria.dto';
import { UpdateTipoGaleriaDto } from './dto/update-tipo-galeria.dto';
import { FindTipoGaleriaDto } from './dto/find-tipo-galeria.dto';
import { Not, Repository } from 'typeorm';
import { TipoGaleria } from './tipo-galeria.entity';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TipoGaleriasService {
  constructor(
    @InjectRepository(TipoGaleria)
    private readonly TipoGaleriaRepsitory: Repository<TipoGaleria>,
  ) {}
  async create(createTipoGaleriaDto: CreateTipoGaleriaDto) {
    const nombreGaleria = await this.TipoGaleriaRepsitory.findOneBy({
      nombre: createTipoGaleriaDto.nombre,
    });

    if (nombreGaleria) {
      throw new BadRequestException('el nombre de tipo galeria ya existe');
    }

    const tipoGaleriaCreada =
      await this.TipoGaleriaRepsitory.save(createTipoGaleriaDto);

    return {
      id: tipoGaleriaCreada.idTipoGaleria,
      nombreTipoGaleria: tipoGaleriaCreada.nombre,
    };
  }

  async findAll() {
    const tipoGaleria = await this.TipoGaleriaRepsitory.find();
    if (tipoGaleria.length === 0) {
      throw new NotFoundException('tipos de galerias no encontradas');
    }

    return plainToInstance(FindTipoGaleriaDto, tipoGaleria, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(idTipoGaleria: number) {
    const tipoGaleria = await this.TipoGaleriaRepsitory.findOneBy({
      idTipoGaleria,
    });
    if (!tipoGaleria) {
      throw new NotFoundException('tipo de galeria no encontrada');
    }

    return plainToInstance(FindTipoGaleriaDto, tipoGaleria, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    idTipoGaleria: number,
    updateTipoGaleriaDto: UpdateTipoGaleriaDto,
  ) {
    const tipoGaleria = await this.TipoGaleriaRepsitory.findOneBy({
      idTipoGaleria,
    });
    if (!tipoGaleria) {
      throw new NotFoundException('tipo de galeria no encontrado');
    }

    const nombreTipoGaleria = await this.TipoGaleriaRepsitory.findOneBy({
      nombre: updateTipoGaleriaDto.nombre,
      idTipoGaleria: Not(idTipoGaleria),
    });

    if (nombreTipoGaleria) {
      throw new BadRequestException('el nombre de tipo galeria ya existe');
    }

    await this.TipoGaleriaRepsitory.save({
      ...tipoGaleria,
      ...updateTipoGaleriaDto,
    });

    const tipoGaleriaActualizada = await this.TipoGaleriaRepsitory.findOneBy({
      idTipoGaleria,
    });
    return {
      id: tipoGaleriaActualizada.idTipoGaleria,
      nombreTipoGaleria: tipoGaleriaActualizada.nombre,
    };
  }

  async remove(idTipoGaleria: number) {
    const tipoGaleria = await this.TipoGaleriaRepsitory.findOneBy({
      idTipoGaleria,
    });
    if (!tipoGaleria) {
      throw new NotFoundException('tipo de galeria no encontrado');
    }

    await this.TipoGaleriaRepsitory.softDelete({ idTipoGaleria });
    return {
      id: tipoGaleria.idTipoGaleria,
      nombreTipoGaleria: tipoGaleria.nombre,
    };
  }
}
