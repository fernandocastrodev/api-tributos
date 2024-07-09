import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfil } from '../perfiles/perfil.entity';
import { Repository } from 'typeorm';
import { Pagina } from '../paginas/pagina.entity';
import { Permiso } from './permiso.entity';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private readonly PermisoRepository: Repository<Permiso>,
    @InjectRepository(Perfil)
    private readonly PerfilRepository: Repository<Perfil>,
    @InjectRepository(Pagina)
    private readonly PaginaRepository: Repository<Pagina>,
  ) {}

  async create(createPermisoDto: CreatePermisoDto) {
    const perfil = await this.PerfilRepository.findOneBy({
      idPerfil: createPermisoDto.idPerfil,
    });

    if (!perfil) {
      throw new BadRequestException('idPerfil no encontrado');
    }

    const pagina = await this.PaginaRepository.findOneBy({
      idPagina: createPermisoDto.idPagina,
    });

    if (!pagina) {
      throw new BadRequestException('idPagina no encontrada');
    }

    const existePermiso = await this.findByPaginaAndPerfil(
      createPermisoDto.idPerfil,
      createPermisoDto.idPagina,
    );
    if (existePermiso.length > 0) {
      throw new NotFoundException(
        'La página ya existe para el perfil otorgado',
      );
    }

    const permiso = {
      ...createPermisoDto,
      perfil,
      pagina,
    };
    return await this.PermisoRepository.save(permiso);
  }

  async findAll() {
    const permiso = await this.PermisoRepository.find();
    if (permiso.length === 0)
      throw new NotFoundException(
        'No se encontraron permisos en la base de datos',
      );
    return permiso;
  }

  async findOne(idPermiso: number) {
    const permiso = await this.PermisoRepository.findOneBy({
      idPermiso,
    });
    if (!permiso) {
      throw new NotFoundException('permiso no encontrado');
    }
    return permiso;
  }

  async findByPaginaAndPerfil(
    perfilId: number,
    paginaId: number,
  ): Promise<Permiso[]> {
    const permisos = await this.PermisoRepository.find({
      where: {
        pagina: { idPagina: paginaId },
        perfil: { idPerfil: perfilId },
      },
    });
    return permisos;
  }

  async update(idPermiso: number, updatePermisoDto: UpdatePermisoDto) {
    const permiso = await this.PermisoRepository.findOneBy({
      idPermiso,
    });
    if (!permiso) {
      throw new NotFoundException('permiso no encontrado');
    }

    const perfil = await this.PerfilRepository.findOneBy({
      idPerfil: updatePermisoDto.idPerfil,
    });

    if (!perfil) {
      throw new BadRequestException('idPerfil no encontrado');
    }

    const pagina = await this.PaginaRepository.findOneBy({
      idPagina: updatePermisoDto.idPagina,
    });

    if (!pagina) {
      throw new BadRequestException('idPagina no encontrada');
    }

    return await this.PermisoRepository.save({
      ...permiso,
      ...updatePermisoDto,
      perfil,
      pagina,
    });
  }

  async remove(idPermiso: number) {
    const permiso = await this.PermisoRepository.findOneBy({
      idPermiso,
    });
    if (!permiso) {
      throw new NotFoundException('permiso no encontrado');
    }
    await this.PermisoRepository.softDelete({ idPermiso });
    return {
      message: `Permiso id: ${permiso.idPermiso}, fue Eliminado con exito`,
    };
  }
}
