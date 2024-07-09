import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Perfil } from './perfil.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class PerfilesService {
  constructor(
    @InjectRepository(Perfil)
    private readonly PerfilRepository: Repository<Perfil>,
  ) {}

  async create(createPerfilDto: CreatePerfilDto) {
    const perfil = await this.PerfilRepository.findOneBy({
      nombre: createPerfilDto.nombre,
    });

    if (perfil) {
      throw new BadRequestException('nombre de perfil ya existe');
    }
    return await this.PerfilRepository.save(createPerfilDto);
  }

  async findAll() {
    const perfil = await this.PerfilRepository.find();
    if (perfil.length === 0) {
      throw new NotFoundException('perfiles no encontrados');
    }
    return perfil;
  }

  async findOne(idPerfil: number) {
    const perfil = await this.PerfilRepository.findOneBy({ idPerfil });
    if (!perfil) {
      throw new NotFoundException('perfil no encontrado');
    }

    return perfil;
  }

  async findOneName(nombre: string) {
    const perfil = await this.PerfilRepository.findOneBy({ nombre });
    if (!perfil) {
      throw new NotFoundException('nombre perfil no encontrado');
    }

    return perfil;
  }

  async update(idPerfil: number, updatePerfilDto: UpdatePerfilDto) {
    const perfil = await this.PerfilRepository.findOneBy({ idPerfil });
    if (!perfil) {
      throw new NotFoundException('perfil no encontrado');
    }
    const nombrePerfil = await this.PerfilRepository.findOneBy({
      nombre: updatePerfilDto.nombre,
      idPerfil: Not(idPerfil),
    });
    if (nombrePerfil) {
      throw new BadRequestException('nombre de perfil ya existe');
    }
    await this.PerfilRepository.update(idPerfil, updatePerfilDto);

    const perfilActualizado = await this.PerfilRepository.findOneBy({
      idPerfil,
    });

    return perfilActualizado;
  }

  async remove(idPerfil: number) {
    const perfil = await this.PerfilRepository.findOneBy({ idPerfil });
    if (!perfil) {
      throw new NotFoundException('perfil no encontrado');
    }
    await this.PerfilRepository.softDelete({ idPerfil });
    return {
      message: `Perfil ${perfil.nombre} de id: ${idPerfil} fue Eliminado con exito`,
    };
  }
}
