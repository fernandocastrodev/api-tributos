import { Expose, Type } from 'class-transformer';

export class ImagenDto {
  @Expose()
  idImagen: string;

  @Expose()
  url: string;

  @Expose()
  texto: string;
}

export class TextoDto {
  @Expose()
  idTexto: string;

  @Expose()
  texto: string;

  @Expose()
  tipoTexto: string;
}

export class VideoDto {
  @Expose()
  idVideo: string;

  @Expose()
  url: string;

  @Expose()
  descripcion: string;
}

export class GaleriaDto {
  @Expose()
  idGaleria: string;

  @Expose()
  orden: number;

  @Expose()
  idTipoGaleria: string;

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
  idTributo: string;

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
  idSubscripcion: string;

  @Expose()
  qr: string;

  @Expose()
  urlPersonalizada: string;

  @Expose()
  @Type(() => GaleriaDto)
  galeria: GaleriaDto[];
}
