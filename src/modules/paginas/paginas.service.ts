import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaginaDto } from './dto/create-pagina.dto';
import { UpdatePaginaDto } from './dto/update-pagina.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagina } from './pagina.entity';
import { Not, Repository } from 'typeorm';
import { Permiso } from '../permisos/permiso.entity';
import { plainToInstance } from 'class-transformer';
import { PaginaPermisoDto } from './dto/pagina-permiso.dto';

@Injectable()
export class PaginasService {
  constructor(
    @InjectRepository(Pagina)
    private readonly PaginaRepository: Repository<Pagina>,
    @InjectRepository(Permiso)
    private readonly PermisoRepository: Repository<Permiso>,
  ) {}

  async create(createPaginaDto: CreatePaginaDto) {
    const pagina = await this.PaginaRepository.findOneBy({
      urlPagina: createPaginaDto.urlPagina,
    });

    if (pagina) {
      throw new BadRequestException('url de la pagina ya existe');
    }

    const ordenPagina = await this.PaginaRepository.findOneBy({
      orden: createPaginaDto.orden,
    });

    if (ordenPagina) {
      throw new BadRequestException('el orden de la pagina ya existe');
    }

    const paginaCreada = await this.PaginaRepository.save(createPaginaDto);
    return {
      id: paginaCreada.idPagina,
      nombrePagina: paginaCreada.nombrePagina,
    };
  }

  async findAll() {
    const pagina = await this.PaginaRepository.find();
    if (pagina.length === 0)
      throw new NotFoundException('paginas no encontradas');
    return pagina;
  }

  async findOne(idPagina: string) {
    const pagina = await this.PaginaRepository.findOneBy({
      idPagina,
    });
    if (!pagina) {
      throw new NotFoundException('pagina no encontrada');
    }
    return pagina;
  }

  async findOneName(nombrePagina: string) {
    const pagina = await this.PaginaRepository.findOneBy({
      nombrePagina,
    });
    if (!pagina) {
      throw new NotFoundException('nombre pagina no encontrada');
    }
    return pagina;
  }

  async obtenerPaginasConPermisos(
    idPerfil: string,
  ): Promise<PaginaPermisoDto[]> {
    const permisos = await this.PermisoRepository.find({
      where: { perfil: { idPerfil } },
      relations: ['pagina'],
    });

    const paginasDto = permisos.map((permiso) =>
      plainToInstance(PaginaPermisoDto, {
        idPagina: permiso.pagina.idPagina,
        nombrePagina: permiso.pagina.nombrePagina,
        urlPagina: permiso.pagina.urlPagina,
        iconoPagina: permiso.pagina.iconoPagina,
        orden: permiso.pagina.orden,
        permiso: {
          ver: permiso.ver,
          crear: permiso.crear,
          eliminar: permiso.eliminar,
          actualizar: permiso.actualizar,
        },
      }),
    );

    return paginasDto;
  }
  async update(idPagina: string, updatePaginaDto: UpdatePaginaDto) {
    const pagina = await this.PaginaRepository.findOneBy({ idPagina });
    if (!pagina) {
      throw new NotFoundException('pagina no encontrada');
    }

    const urlPagina = await this.PaginaRepository.findOneBy({
      urlPagina: updatePaginaDto.urlPagina,
      idPagina: Not(idPagina),
    });
    if (urlPagina) {
      throw new BadRequestException('url de la pagina ya existe');
    }

    const ordenPagina = await this.PaginaRepository.findOneBy({
      orden: updatePaginaDto.orden,
      idPagina: Not(idPagina),
    });
    if (ordenPagina) {
      throw new BadRequestException('orden de la pagina ya existe');
    }

    await this.PaginaRepository.update(idPagina, updatePaginaDto);

    const paginaActualizado = await this.PaginaRepository.findOneBy({
      idPagina,
    });

    return {
      id: paginaActualizado.idPagina,
      nombrePgina: paginaActualizado.nombrePagina,
    };
  }

  async remove(idPagina: string) {
    const pagina = await this.PaginaRepository.findOneBy({ idPagina });
    if (!pagina) {
      throw new NotFoundException('pagina no encontrada');
    }
    await this.PaginaRepository.softDelete({ idPagina });
    return {
      id: pagina.idPagina,
      nombrePagina: pagina.nombrePagina,
    };
  }
}
