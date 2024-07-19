import { Exclude, Expose, Transform } from 'class-transformer';

export class findAllSuscripcionDto {
  @Expose()
  idSuscripcion: number;

  @Expose()
  fechaSuscripcion: Date;

  @Expose()
  estadoSuscripcion: boolean;

  @Exclude()
  fechaCreacion: Date;

  @Exclude()
  fechaModificacion: Date;

  @Exclude()
  fechaEliminacion: Date | null;

  @Expose()
  @Transform(({ obj }) => ({
    idUsuario: obj.usuario.idUsuario,
    nombre: obj.usuario.nombre,
  }))
  usuario: { idUsuario: string; nombre: string };

  @Expose()
  @Transform(({ obj }) => ({
    idPlan: obj.plan.idPlan,
    nombre: obj.plan.nombre,
  }))
  plan: { idPlan: string; nombre: string };
}
