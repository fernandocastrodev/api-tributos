import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Not, Repository } from 'typeorm';
import { Plan } from './plan.entity';
import { FindOnePlanDto } from './dto/findOne-plan.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlanesService {
  constructor(
    @InjectRepository(Plan)
    private readonly PlanRepository: Repository<Plan>,
  ) {}
  async create(createPlanDto: CreatePlanDto) {
    const nombrePlan = await this.PlanRepository.findOneBy({
      nombre: createPlanDto.nombre,
    });

    if (nombrePlan) {
      throw new BadRequestException('el nombre del plan ya existe');
    }

    const planCreado = await this.PlanRepository.save(createPlanDto);

    return {
      id: planCreado.idPlan,
      nombrePlan: planCreado.nombre,
    };
  }

  async findAll() {
    const plan = await this.PlanRepository.find({where: { estado: true },});
    if (plan.length === 0) {
      throw new NotFoundException('planes no encontrados');
    }
    return plan;
  }

  async findOne(idPlan: number) {
    const plan = await this.PlanRepository.findOneBy({
      idPlan,
      estado: true,
    });
    if (!plan) {
      throw new NotFoundException('plan no encontrado');
    }
    return plainToInstance(FindOnePlanDto, plan, {
      excludeExtraneousValues: true,
    });
  }

  async update(idPlan: number, updatePlanDto: UpdatePlanDto) {
    const plan = await this.PlanRepository.findOneBy({
      idPlan,
      estado: true,
    });
    if (!plan) {
      throw new NotFoundException('plan no encontrado');
    }
    const nombrePLan = await this.PlanRepository.findOneBy({
      nombre: updatePlanDto.nombre,
      idPlan: Not(idPlan),
    });
    if (nombrePLan) {
      throw new BadRequestException('el nombre del plan ya existe');
    }

    await this.PlanRepository.update(idPlan, updatePlanDto);

    const planActualizado = await this.PlanRepository.findOneBy({
      idPlan,
    });

    return {
      id: planActualizado.idPlan,
      nombrePLan: planActualizado.nombre,
    };
  }

  async remove(idPlan: number) {
    const plan = await this.PlanRepository.findOneBy({
      idPlan,
    });
    if (!plan) {
      throw new NotFoundException('plan no encontrado');
    }

    await this.PlanRepository.softDelete(idPlan);

    return {
      id: plan.idPlan,
      nombrePlan: plan.nombre,
    };
  }
}
