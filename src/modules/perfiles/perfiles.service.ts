import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Perfil } from './perfil.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class PerfilesService {
  constructor(
    @InjectRepository(Perfil)
    private readonly PerfilRepository: Repository<Perfil>,
    @InjectRepository(Usuario)
    private readonly UsuarioRepository: Repository<Usuario>,
    @Inject(forwardRef(() => UsuariosService))
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createPerfilDto: CreatePerfilDto) {
    const perfil = await this.PerfilRepository.findOneBy({
      nombre: createPerfilDto.nombre,
    });

    if (perfil) {
      throw new BadRequestException('nombre de perfil ya existe');
    }
    const perfilCreado = await this.PerfilRepository.save(createPerfilDto);
    return {
      id: perfilCreado.idPerfil,
      nombrePerfil: perfilCreado.nombre,
    };
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

    return {
      id: perfilActualizado.idPerfil,
      nombrePerfil: perfilActualizado.nombre,
    };
  }

  async remove(idPerfil: number) {
    const perfil = await this.PerfilRepository.findOneBy({ idPerfil });
    if (!perfil) {
      throw new NotFoundException('perfil no encontrado');
    }

    const usuarioAsociado = await this.UsuarioRepository.find({
      where: {
        estado: true,
        perfil: { idPerfil: idPerfil },
      },
    });

    if (usuarioAsociado.length > 0) {
      throw new NotFoundException(
        'No se puede eliminar el perfil, tiene usuarios asociados',
      );
    }

    await this.PerfilRepository.softDelete({ idPerfil });
    return {
      id: perfil.idPerfil,
      nombrePerfil: perfil.nombre,
    };
  }
}
