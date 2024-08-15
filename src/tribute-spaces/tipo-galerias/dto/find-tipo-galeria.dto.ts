import { Exclude, Expose } from 'class-transformer';

export class FindTipoGaleriaDto {
  @Expose()
  idTipoGaleria: string;

  @Expose()
  nombre: string;

  @Expose()
  descipcion: string;

  @Exclude()
  fechaCreacion: Date;

  @Exclude()
  fechaModificacion: Date;

  @Exclude()
  fechaEliminacion: Date;
}
