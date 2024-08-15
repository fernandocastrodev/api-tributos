import { Exclude, Expose } from 'class-transformer';

export class FindVideoDto {
  @Expose()
  idVideo: string;

  @Expose()
  url: string;

  @Expose()
  descripcion: string;

  @Exclude()
  fechaCreacion: Date;

  @Exclude()
  fechaModificacion: Date;

  @Exclude()
  fechaEliminacion: Date;

  @Expose()
  idGaleria: string;
}
