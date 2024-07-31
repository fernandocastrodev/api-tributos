import { Exclude, Expose } from 'class-transformer';

export class FindImagenDto {
  @Expose()
  idImagen: number;

  @Expose()
  url: string;

  @Expose()
  texto: string;

  @Exclude()
  fechaCreacion: Date;

  @Exclude()
  fechaModificacion: Date;

  @Exclude()
  fechaEliminacion: Date;

  @Expose()
  idGaleria: number;
}
