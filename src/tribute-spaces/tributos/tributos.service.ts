import { Injectable, NotFoundException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CreateTributoDto } from './dto/create-tributo.dto';
import { UpdateTributoDto } from './dto/update-tributo.dto';
import { Tributo } from './tributo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Suscripcion } from '../suscripciones/suscripcion.entity';
import { plainToInstance } from 'class-transformer';
import { FindTributoDto } from './dto/find-tributo.dto';
import { TributoGaleriaDto } from './dto/tributo-galeria.dto';
import { Galeria } from '../galerias/galeria.entity';
import { FileService} from '../../common/services/files/file.service'
import { QrService} from '../../modules/qr/qr.service'
import * as path from 'path';

dotenv.config();

@Injectable()
export class TributosService {
  constructor(
    @InjectRepository(Tributo)
    private readonly TributoRepository: Repository<Tributo>,
    @InjectRepository(Suscripcion)
    private readonly SuscripcionRepository: Repository<Suscripcion>,
    @InjectRepository(Galeria)
    private readonly GaleriaRepository: Repository<Galeria>,

    private readonly fileService: FileService,

    private readonly qrService: QrService,

  ) {}
  async create(createTributoDto: CreateTributoDto) {
    const suscripcion = await this.SuscripcionRepository.findOneBy({
      idSuscripcion: createTributoDto.idSubscripcion,
      estadoSuscripcion:true,
    });
    if (!suscripcion) {
      throw new NotFoundException('suscripcion no encontrada');
    }   

    const tributo = {
      ...createTributoDto,
      suscripcion,
    };

    const tributoCreado = await this.TributoRepository.save(tributo);

    const urlTributo = `${process.env.WEBQR}${tributoCreado.idTributo}`

    const verificarCarpetaUsuario = await this.fileService.verifyFolder(suscripcion.usuario.idUsuario)

    const crearCarpetaTributo = await this.fileService.createFolder(`${suscripcion.usuario.idUsuario}/${tributoCreado.idTributo}`)

    const crearCarpetaImagen = await this.fileService.createFolder(`${suscripcion.usuario.idUsuario}/${tributoCreado.idTributo}/images`)

    const crearCarpetaQR = await this.fileService.createFolder(`${suscripcion.usuario.idUsuario}/${tributoCreado.idTributo}/qr`)

    const crearQrImagen = await this.qrService.saveQrCodeToFile(urlTributo, suscripcion.usuario.idUsuario, tributoCreado.idTributo)

    const relativePath = path.relative(path.join(process.cwd(), 'public'), crearQrImagen);
    const qrUrl = `/static/${relativePath.replace(/\\/g, '/')}`;

    await this.TributoRepository.update(tributoCreado.idTributo, {
      urlPersonalizada: urlTributo,
      qr: qrUrl,
    });

    return {
      id: tributoCreado.idTributo,
      nombreTributo: `${tributoCreado.nombre} ${tributoCreado.apellido}`,
      urlTrubuto: urlTributo,
      carpetaUsuario:`${verificarCarpetaUsuario.message}`,
      crearCarpetaImagen: `${crearCarpetaImagen.message}`,
      carpetaTributo: `${crearCarpetaTributo.message}`,
      crearCarpetaQR: `${crearCarpetaQR.message}`,
      qrUrl: qrUrl
    };
  }

  async findAll() {
    const tributo = await this.TributoRepository.find();

    if (tributo.length === 0) {
      throw new NotFoundException('tributos no encontrados');
    }
    return plainToInstance(FindTributoDto, tributo, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(idTributo: string) {
    const tributo = await this.TributoRepository.findOneBy({
      idTributo,
    });

    if (!tributo) {
      throw new NotFoundException('tributo no encontrado');
    }

    return plainToInstance(FindTributoDto, tributo, {
      excludeExtraneousValues: true,
    });
  }

  async obtenerTributoConGalerias(idTributo: string): Promise<TributoGaleriaDto> {
    const galerias = await this.GaleriaRepository.find({
      where: { tributo: { idTributo } },
      relations: ['tributo', 'tipoGaleria', 'imagenes', 'textos', 'videos'],
    });
  
    if (!galerias || galerias.length === 0) {
      throw new NotFoundException('Galerías no encontradas');
    }
  
    const tributoBase = galerias[0].tributo;
  
    const tributoDto = plainToInstance(TributoGaleriaDto, {
      idTributo: tributoBase.idTributo,
      nombre: tributoBase.nombre,
      apellido: tributoBase.apellido,
      rut: tributoBase.rut,
      fechaNacimiento: tributoBase.fechaNacimiento,
      fechaDefuncion: tributoBase.fechaDefuncion,
      qr: tributoBase.qr,
      urlPersonalizada: tributoBase.urlPersonalizada,
      galeria: galerias.map(galeria => ({
        idGaleria: galeria.idGaleria,
        orden: galeria.orden,
        nombre: galeria.nombre,
        idTipoGaleria: galeria.tipoGaleria.idTipoGaleria,
        imagenes: galeria.imagenes.map(imagen => ({
          idImagen: imagen.idImagen,
          url: imagen.url,
          texto: imagen.texto,
        })),
        textos: galeria.textos.map(texto => ({
          idTexto: texto.idTexto,
          texto: texto.texto,
          tipoTexto: texto.tipoTexto,
        })),
        videos: galeria.videos.map(video => ({
          idVideo: video.idVideo,
          url: video.url,
          descripcion: video.descripcion,
        })),
      })),
    });
  
    return tributoDto;
  }

  async update(idTributo: string, updateTributoDto: UpdateTributoDto) {
    const tributo = await this.TributoRepository.findOneBy({ idTributo });
    if (!tributo) {
      throw new NotFoundException('tributo no encontrado');
    }

    const suscripcion = await this.SuscripcionRepository.findOneBy({
      idSuscripcion: updateTributoDto.idSubscripcion,
      estadoSuscripcion:true,
    });

    if (!suscripcion) {
      throw new NotFoundException('suscricion no encontrada');
    }

    await this.TributoRepository.save({
      ...tributo,
      ...updateTributoDto,
      suscripcion,
    });

    const tributoActualizado = await this.TributoRepository.findOneBy({
      idTributo,
    });

    return {
      id: tributoActualizado.idTributo,
      nombreTributo: `${tributoActualizado.nombre} ${tributoActualizado.apellido}`,
    };
  }

  async remove(idTributo: string) {
    const tributo = await this.TributoRepository.findOneBy({
      idTributo,
    });
    if (!tributo) {
      throw new NotFoundException('tributo no encontrado');
    }
    await this.TributoRepository.softDelete({ idTributo });
    return {
      id: tributo.idTributo,
      nombreTributo: `${tributo.nombre} ${tributo.apellido}`,
    };
  }
}
