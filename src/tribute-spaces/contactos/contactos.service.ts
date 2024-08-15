import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacto } from './contacto.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { findOneContactoDto } from './dto/findOne-contacto.dto';

@Injectable()
export class ContactosService {
  constructor(
    @InjectRepository(Contacto)
    private readonly ContactoRepository: Repository<Contacto>,
  ) {}

  async create(createContactoDto: CreateContactoDto) {
    const contactoCreado =
      await this.ContactoRepository.save(createContactoDto);

    return {
      id: contactoCreado.idContacto,
      nombreContacto: contactoCreado.nombre,
    };
  }

  async findAll() {
    const contacto = await this.ContactoRepository.find();

    if (contacto.length === 0) {
      throw new NotFoundException('contactos no encontrados');
    }
    return contacto;
  }

  async findOne(idContacto: string) {
    const contacto = await this.ContactoRepository.findOneBy({ idContacto });

    if (!contacto) {
      throw new NotFoundException('contacto no encontrado');
    }

    return plainToInstance(findOneContactoDto, contacto, {
      excludeExtraneousValues: true,
    });
  }

  async update(idContacto: string, updateContactoDto: UpdateContactoDto) {
    const contacto = await this.ContactoRepository.findOneBy({
      idContacto,
    });
    if (!contacto) {
      throw new NotFoundException('contacto no encontrado');
    }

    await this.ContactoRepository.update(idContacto, updateContactoDto);

    const contactoActualizado = await this.ContactoRepository.findOneBy({
      idContacto,
    });

    return {
      id: contactoActualizado.idContacto,
      nombreContacto: contactoActualizado.nombre,
    };
  }

  async remove(idContacto: string) {
    const contacto = await this.ContactoRepository.findOneBy({ idContacto });

    if (!contacto) {
      throw new NotFoundException('contacto no encontrado');
    }
    await this.ContactoRepository.softDelete(idContacto);

    return {
      id: contacto.idContacto,
      nombreContacto: contacto.nombre,
    };
  }
}
