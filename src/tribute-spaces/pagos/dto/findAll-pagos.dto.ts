import { Exclude, Expose, Transform } from 'class-transformer';

export class FindAllPagoDto {
  @Expose()
  fecha: Date;

  @Exclude()
  token: string;

  @Expose()
  monto: number;

  @Expose()
  estado: boolean;

  @Exclude()
  fechaCreacion: Date;

  @Exclude()
  fechaModificacion: Date;

  @Exclude()
  fechaEliminacion: Date | null;

  @Expose()
  @Transform(({ obj }) => ({
    idSuscripcion: obj.suscripcion.idSuscripcion,
  }))
  suscripcion: { idSuscripcion: number };
}
