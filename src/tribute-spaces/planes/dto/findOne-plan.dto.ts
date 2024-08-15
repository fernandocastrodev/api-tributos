import { Exclude, Expose } from 'class-transformer';

export class FindOnePlanDto {
  @Expose()
  idPlan: string;

  @Expose()
  nombre: string;

  @Expose()
  precio: number;

  @Expose()
  descripcion: string;

  @Expose()
  estado: boolean;

  @Exclude()
  fechaCreacion: Date;

  @Exclude()
  fechaModificacion: Date;

  @Exclude()
  fechaEliminacion: Date | null;
}
