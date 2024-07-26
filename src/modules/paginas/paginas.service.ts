import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaginaDto } from './dto/create-pagina.dto';
import { UpdatePaginaDto } from './dto/update-pagina.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagina } from './pagina.entity';
import { In, Not, Repository } from 'typeorm';
import { Permiso } from '../permisos/permiso.entity';

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

  async findOne(idPagina: number) {
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

  async obtenerPaginasConPermisos(idPerfil: number): Promise<Pagina[]> {
    // Obtener todos los permisos relacionados con el idPerfil proporcionado
    const permisos = await this.PermisoRepository.find({
      where: { perfil: { idPerfil } },
      relations: ['pagina'], // Cargar la relación de la página para cada permiso
    });

    // Extraer los IDs de las páginas de los permisos obtenidos
    const idPaginas = permisos.map((permiso) => permiso.pagina.idPagina);

    // Obtener todas las páginas correspondientes a los IDs
    const paginas = await this.PaginaRepository.find({
      where: { idPagina: In(idPaginas) },
      relations: ['permisos'], // Cargar los permisos para cada página
    });

    return paginas;
  }
  async update(idPagina: number, updatePaginaDto: UpdatePaginaDto) {
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

  async remove(idPagina: number) {
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
