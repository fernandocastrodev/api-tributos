import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacto } from './contacto.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ContactosService {
  constructor(
    @InjectRepository(Contacto)
    private readonly ContactoRepository: Repository<Contacto>,
  ) {}

  async create(createContactoDto: CreateContactoDto) {
    const correo = await this.ContactoRepository.findOneBy({
      correo: createContactoDto.correo,
    });
    if (correo) {
      throw new BadRequestException('correo ya existe');
    }
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

  async findOne(idContacto: number) {
    const contacto = await this.ContactoRepository.findOneBy({ idContacto });

    if (!contacto) {
      throw new NotFoundException('contacto no encontrado');
    }
    return contacto;
  }

  async update(idContacto: number, updateContactoDto: UpdateContactoDto) {
    const contacto = await this.ContactoRepository.findOneBy({
      idContacto,
    });
    if (!contacto) {
      throw new NotFoundException('contacto no encontrado');
    }

    const correo = await this.ContactoRepository.findOneBy({
      correo: updateContactoDto.correo,
      idContacto: Not(idContacto),
    });

    if (correo) {
      throw new BadRequestException('correo ya existe');
    }

    await this.ContactoRepository.save({
      ...contacto,
      ...updateContactoDto,
    });

    const contactoActualizado = await this.ContactoRepository.findOneBy({
      idContacto,
    });

    return {
      id: contactoActualizado.idContacto,
      nombreContacto: contactoActualizado.nombre,
    };
  }

  async remove(idContacto: number) {
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
