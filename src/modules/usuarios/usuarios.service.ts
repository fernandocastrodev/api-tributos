import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './usuario.entity';
import { Perfil } from '../perfiles/perfil.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly UsuarioRepository: Repository<Usuario>,
    @InjectRepository(Perfil)
    private PerfilRepository: Repository<Perfil>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const correo = await this.UsuarioRepository.findOneBy({
      correo: createUsuarioDto.correo,
    });

    if (correo) {
      throw new BadRequestException('correo ya existe');
    }

    const perfil = await this.PerfilRepository.findOneBy({
      idPerfil: createUsuarioDto.idPerfil,
    });

    if (!perfil) {
      throw new NotFoundException('perfil no encontrado');
    }

    const hashedPassword = await bcryptjs.hash(
      createUsuarioDto.claveAcceso,
      10,
    );

    const usuario = {
      ...createUsuarioDto,
      claveAcceso: hashedPassword,
      perfil, // Asigna el perfil al usuario
    };
    return await this.UsuarioRepository.save(usuario);
  }

  async findOneByEmail(correo: string) {
    return await this.UsuarioRepository.findOneBy({ correo });
  }

  async findAll() {
    const usuario = await this.UsuarioRepository.find();
    if (usuario.length === 0) {
      throw new NotFoundException(
        'No se encontraron usuarios en la base de datos',
      );
    }

    return usuario;
  }

  async findOne(idUsuario: number) {
    const usuario = await this.UsuarioRepository.findOneBy({ idUsuario });
    if (!usuario) {
      throw new NotFoundException('usuario no encontrado');
    }

    return usuario;
  }

  async findOneByRut(rut: string) {
    const usuario = await this.UsuarioRepository.findOneBy({ rut });
    if (!usuario) {
      throw new NotFoundException('rut de usuario no encontrado');
    }

    return usuario;
  }

  async update(idUsuario: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.UsuarioRepository.findOneBy({ idUsuario });

    if (!usuario) {
      throw new BadRequestException('usuario no encontrado');
    }
    let perfil;
    if (updateUsuarioDto.idPerfil) {
      perfil = await this.PerfilRepository.findOneBy({
        idPerfil: updateUsuarioDto.idPerfil,
      });

      if (!perfil) {
        throw new BadRequestException('Perfil no encontrado');
      }
    }
    const hashedPassword = await bcryptjs.hash(
      updateUsuarioDto.claveAcceso,
      10,
    );
    return await this.UsuarioRepository.save({
      ...usuario,
      ...updateUsuarioDto,
      claveAcceso: hashedPassword,
      perfil,
    });
  }

  async remove(idUsuario: number) {
    const usuario = await this.UsuarioRepository.findOneBy({ idUsuario });
    if (!usuario) {
      throw new NotFoundException('usuario no encontrado');
    }
    await this.UsuarioRepository.softDelete({ idUsuario });
    return {
      message: `Usuario ${usuario.nombre} de id: ${idUsuario} fue Eliminado con exito`,
    };
  }
}
