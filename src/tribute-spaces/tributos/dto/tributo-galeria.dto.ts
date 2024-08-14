import { Expose, Type } from 'class-transformer';

export class ImagenDto {
  @Expose()
  idImagen: number;

  @Expose()
  url: string;

  @Expose()
  texto: string;
}

export class TextoDto {
  @Expose()
  idTexto: number;

  @Expose()
  texto: string;

  @Expose()
  tipoTexto: string;
}

export class VideoDto {
  @Expose()
  idVideo: number;

  @Expose()
  url: string;

  @Expose()
  descripcion: string;
}

export class GaleriaDto {
  @Expose()
  idGaleria: number;

  @Expose()
  orden: number;

  @Expose()
  idTipoGaleria: number;

  @Expose()
  @Type(() => ImagenDto)
  imagenes: ImagenDto[];

  @Expose()
  @Type(() => TextoDto)
  textos: TextoDto[];

  @Expose()
  @Type(() => VideoDto)
  videos: VideoDto[];
}

export class TributoGaleriaDto {
  @Expose()
  idTributo: number;

  @Expose()
  nombre: string;

  @Expose()
  apellido: string;

  @Expose()
  rut: string;

  @Expose()
  fechaNacimiento: Date;

  @Expose()
  fechaDefuncion: Date;

  @Expose()
  idSubscripcion: number;

  @Expose()
  qr: string;

  @Expose()
  urlPersonalizada: string;

  @Expose()
  @Type(() => GaleriaDto)
  galeria: GaleriaDto[];
}
