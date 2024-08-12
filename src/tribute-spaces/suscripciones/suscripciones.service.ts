import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto';
import { UpdateSuscripcionDto } from './dto/update-suscripcion.dto';
import { findAllSuscripcionDto } from './dto/findAll-suscripcion.dto';
import { findOneSuscripcionDto } from './dto/findOne-suscripcion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../../modules/usuarios/usuario.entity';
import { Not, Repository } from 'typeorm';
import { Plan } from '../planes/plan.entity';
import { Suscripcion } from './suscripcion.entity';
import { plainToInstance } from 'class-transformer';
import { UsuariosService } from '../../modules/usuarios/usuarios.service';

@Injectable()
export class SuscripcionesService {
  constructor(
    @InjectRepository(Suscripcion)
    private readonly SuscripcionRepository: Repository<Suscripcion>,
    @InjectRepository(Usuario)
    private readonly UsuarioRepository: Repository<Usuario>,
    @InjectRepository(Plan)
    private PlanRepository: Repository<Plan>,
  ) {}
  async create(createSuscripcionDto: CreateSuscripcionDto) {
    const usuario = await this.UsuarioRepository.findOneBy({
      idUsuario: createSuscripcionDto.idUsuario,
      estado: true,
    });

    if (!usuario) {
      throw new NotFoundException('usuario no encontrado');
    }

    const plan = await this.PlanRepository.findOneBy({
      idPlan: createSuscripcionDto.idPlan,
      estado: true,
    });

    if (!plan) {
      throw new NotFoundException('plan no encontrado');
    }

    const existeSuscripcion = await this.findByUsuarioAndPlanCreate(
      createSuscripcionDto.idUsuario,
      createSuscripcionDto.idPlan,
    );
    if (existeSuscripcion.length > 0) {
      throw new NotFoundException('El usuario ya existe para el plan otorgado');
    }

    const suscripcion = {
      ...createSuscripcionDto,
      usuario,
      plan,
    };
    const suscripcionCreada =
      await this.SuscripcionRepository.save(suscripcion);
    return {
      id: suscripcionCreada.idSuscripcion,
      nombreUsuario: `${suscripcionCreada.usuario.nombre} ${suscripcionCreada.usuario.apellido}`,
    };
  }

  async findAll() {
    const suscripcion = await this.SuscripcionRepository.find({
      where: { estadoSuscripcion: true },
      relations: ['usuario', 'plan'],
    });

    if (suscripcion.length === 0) {
      throw new NotFoundException('suscripciones no encontradas');
    }
    return plainToInstance(findAllSuscripcionDto, suscripcion, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(idSuscripcion: number) {
    const suscripcion = await this.SuscripcionRepository.findOneBy({
      idSuscripcion,
      estadoSuscripcion: true,
    });
    if (!suscripcion) {
      throw new NotFoundException('suscripcion no encontrada');
    }
    return plainToInstance(findOneSuscripcionDto, suscripcion, {
      excludeExtraneousValues: true,
    });
  }

  async findByUsuarioAndPlanCreate(
    usuarioId: number,
    planId: number,
  ): Promise<Suscripcion[]> {
    const suscripciones = await this.SuscripcionRepository.find({
      where: {
        usuario: { idUsuario: usuarioId },
        plan: { idPlan: planId },
      },
    });
    return suscripciones;
  }

  async findByUsuarioAndPlanUpdate(
    suscripcionId: number,
    usuarioId: number,
    planId: number,
  ): Promise<Suscripcion[]> {
    const suscripciones = await this.SuscripcionRepository.find({
      where: {
        idSuscripcion: Not(suscripcionId),
        usuario: { idUsuario: usuarioId },
        plan: { idPlan: planId },
      },
    });
    return suscripciones;
  }

  async update(
    idSuscripcion: number,
    updateSuscripcionDto: UpdateSuscripcionDto,
  ) {
    const suscripcion = await this.SuscripcionRepository.findOneBy({
      idSuscripcion,
      estadoSuscripcion: true,
    });
    if (!suscripcion) {
      throw new NotFoundException('suscripcion no encontrada');
    }

    const usuario = await this.UsuarioRepository.findOneBy({
      idUsuario: updateSuscripcionDto.idUsuario,
      estado: true,
    });

    if (!usuario) {
      throw new NotFoundException('usuario no encontrado');
    }

    const plan = await this.PlanRepository.findOneBy({
      idPlan: updateSuscripcionDto.idPlan,
      estado: true,
    });

    if (!plan) {
      throw new NotFoundException('plan no encontrado');
    }

    const existeSuscripcion = await this.findByUsuarioAndPlanUpdate(
      idSuscripcion,
      updateSuscripcionDto.idUsuario,
      updateSuscripcionDto.idPlan,
    );
    if (existeSuscripcion.length > 0) {
      throw new NotFoundException('El usuario ya existe para el plan otorgado');
    }

    await this.SuscripcionRepository.save({
      ...suscripcion,
      ...updateSuscripcionDto,
      usuario,
      plan,
    });

    const suscripcionActualizada = await this.SuscripcionRepository.findOneBy({
      idSuscripcion,
    });

    return {
      id: suscripcionActualizada.idSuscripcion,
      nombreUsuario: `${suscripcionActualizada.usuario.nombre} ${suscripcionActualizada.usuario.apellido}`,
    };
  }

  async remove(idSuscripcion: number) {
    const suscripcion = await this.SuscripcionRepository.findOneBy({
      idSuscripcion,
    });
    if (!suscripcion) {
      throw new NotFoundException('suscripcion no encontrada');
    }
    await this.SuscripcionRepository.softDelete({ idSuscripcion });
    return {
      id: suscripcion.idSuscripcion,
      nombreUsuario: `${suscripcion.usuario.nombre} ${suscripcion.usuario.apellido}`,
    };
  }
}
