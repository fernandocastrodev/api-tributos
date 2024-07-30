import { Exclude, Expose } from 'class-transformer';

export class FindTipoGaleriaDto {
  @Expose()
  idTipoGaleria: number;

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
