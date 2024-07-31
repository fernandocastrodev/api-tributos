import { Exclude, Expose, Transform } from 'class-transformer';

export class FindGaleriaDto {
  @Expose()
  idGaleria: number;

  @Expose()
  orden: number;

  @Expose()
  idTipoGaleria: number;

  @Expose()
  idTributo: number;

  @Exclude()
  fechaCreacion: Date;

  @Exclude()
  fechaModificacion: Date;

  @Exclude()
  fechaEliminacion: Date | null;

  @Expose()
  @Transform(({ obj }) => ({
    idTipoGaleria: obj.tipoGaleria.idTipoGaleria,
    nombre: obj.tipoGaleria.nombre,
  }))
  tipoGaleria: { idTipoGaleria: string; nombre: string };

  @Expose()
  @Transform(({ obj }) => ({
    idTributo: obj.tributo.idTributo,
    nombreCompleto: `${obj.tributo.nombre} ${obj.tributo.apellido}`,
  }))
  tributo: { idTributo: string; nombreCompleto: string };
}
