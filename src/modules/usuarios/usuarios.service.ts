import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './usuario.entity';
import { Perfil } from '../perfiles/perfil.entity';
import * as bcryptjs from 'bcryptjs';
import { FindAllUsuarioDto } from './dto/findAll-usuario.dto';
import { FindOneUsuarioDto } from './dto/findOne-usuario.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly UsuarioRepository: Repository<Usuario>,
    @InjectRepository(Perfil)
    private PerfilRepository: Repository<Perfil>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { rut } = createUsuarioDto;
    const correo = await this.UsuarioRepository.findOneBy({
      correo: createUsuarioDto.correo,
    });

    if (correo) {
      throw new BadRequestException('correo ya existe');
    }

    if (rut !== null && rut !== undefined) {
      const dni = await this.UsuarioRepository.findOne({
        where: { rut },
      });

      if (dni) {
        throw new BadRequestException('el rut ya existe');
      }
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
      perfil,
    };

    const usuarioCreado = await this.UsuarioRepository.save(usuario);
    return {
      id: usuarioCreado.idUsuario,
      nombreCompleto: `${usuarioCreado.nombre} ${usuarioCreado.apellido}`,
      correo: usuarioCreado.correo,
    };
  }

  async findOneByEmail(correo: string) {
    return await this.UsuarioRepository.findOneBy({ correo });
  }

  async findAll() {
    const usuarios = await this.UsuarioRepository.find({
      relations: ['perfil'],
    });
    if (usuarios.length === 0) {
      throw new NotFoundException(
        'No se encontraron usuarios en la base de datos',
      );
    }

    return plainToInstance(FindAllUsuarioDto, usuarios, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(idUsuario: number) {
    const usuario = await this.UsuarioRepository.findOneBy({ idUsuario });
    if (!usuario) {
      throw new NotFoundException('usuario no encontrado');
    }

    return plainToInstance(FindOneUsuarioDto, usuario, {
      excludeExtraneousValues: true,
    });
  }

  async findOneByRut(rut: string) {
    const usuario = await this.UsuarioRepository.findOneBy({ rut });
    if (!usuario) {
      throw new NotFoundException('rut de usuario no encontrado');
    }

    return plainToInstance(FindOneUsuarioDto, usuario, {
      excludeExtraneousValues: true,
    });
  }

  async update(idUsuario: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.UsuarioRepository.findOneBy({ idUsuario });

    if (!usuario) {
      throw new BadRequestException('usuario no encontrado');
    }
    const dni = await this.UsuarioRepository.findOneBy({
      rut: updateUsuarioDto.rut,
      idUsuario: Not(idUsuario),
    });
    if (dni) {
      throw new BadRequestException('rut del usuario ya existe');
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

    const usuarioActualizado = await this.UsuarioRepository.save({
      ...usuario,
      ...updateUsuarioDto,
      claveAcceso: hashedPassword,
      perfil,
    });
    return {
      id: usuarioActualizado.idUsuario,
      nombreCompleto: `${usuarioActualizado.nombre} ${usuarioActualizado.apellido}`,
    };
  }

  async remove(idUsuario: number) {
    const usuario = await this.UsuarioRepository.findOneBy({ idUsuario });
    if (!usuario) {
      throw new NotFoundException('usuario no encontrado');
    }
    await this.UsuarioRepository.softDelete({ idUsuario });
    return {
      id: usuario.idUsuario,
      nombreCompleto: `${usuario.nombre} ${usuario.apellido}`,
    };
  }
}
