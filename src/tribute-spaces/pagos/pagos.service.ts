import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { FindAllPagoDto } from './dto/findAll-pagos.dto';
import { Suscripcion } from '../suscripciones/suscripcion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './pago.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly PagoRepository: Repository<Pago>,
    @InjectRepository(Suscripcion)
    private readonly SuscripcionRepository: Repository<Suscripcion>,
  ) {}
  async create(createPagoDto: CreatePagoDto) {
    const suscripcion = await this.SuscripcionRepository.findOneBy({
      idSuscripcion: createPagoDto.idSuscripcion,
      estadoSuscripcion: true,
    });

    if (!suscripcion) {
      throw new NotFoundException('suscripcion no encontrada');
    }

    const pago = {
      ...createPagoDto,
      suscripcion,
    };

    const pagoCreado = await this.PagoRepository.save(pago);
    return {
      idPago: pagoCreado.idPago,
      idSuscripcion: pagoCreado.idSuscripcion,
    };
  }

  async findAll() {
    const pago = await this.PagoRepository.find({
      relations: ['suscripcion'],
    });

    if (pago.length === 0) {
      throw new NotFoundException('pagos no encontrados');
    }
    return plainToInstance(FindAllPagoDto, pago, {
      excludeExtraneousValues: true,
    });
  }

  async findPagoBySuscripcion(idSuscripcion: string) {
    const pago = await this.PagoRepository.find({
      where: { suscripcion: { idSuscripcion: idSuscripcion } },
    });

    if (!pago) {
      throw new NotFoundException('pagos no encontrados');
    }
    return pago;
  }

  async findOne(idPago: string) {
    const pago = await this.PagoRepository.findOneBy({ idPago });

    if (!pago) {
      throw new NotFoundException('pago no encontrado');
    }
    return plainToInstance(FindAllPagoDto, pago, {
      excludeExtraneousValues: true,
    });
  }

  async update(idPago: string, updatePagoDto: UpdatePagoDto) {
    const pago = await this.PagoRepository.findOneBy({ idPago });

    if (!pago) {
      throw new NotFoundException('pago no encontrado');
    }

    const suscripcion = await this.SuscripcionRepository.findOneBy({
      idSuscripcion: updatePagoDto.idSuscripcion,
      estadoSuscripcion:true,
    });

    if (!suscripcion) {
      throw new NotFoundException('suscripcion no encontrada');
    }

    await this.PagoRepository.save({
      ...pago,
      ...updatePagoDto,
      suscripcion,
    });

    const pagoActualizada = await this.PagoRepository.findOneBy({
      idPago,
    });
    return {
      idPago: pagoActualizada.idPago,
      idSuscripcion: pagoActualizada.suscripcion.idSuscripcion,
    };
  }

  async remove(idPago: string) {
    const pago = await this.PagoRepository.findOneBy({ idPago });

    if (!pago) {
      throw new NotFoundException('pago no encontrado');
    }
    await this.PagoRepository.softDelete({ idPago });
    return {
      idPago: pago.idPago,
      idSuscripcion: pago.suscripcion.idSuscripcion,
    };
  }
}
