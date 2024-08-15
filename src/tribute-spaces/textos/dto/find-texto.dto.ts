import { Exclude, Expose } from 'class-transformer';

export class FindTextoDto {
  @Expose()
  idTexto: string;

  @Expose()
  texto: string;

  @Expose()
  tipoTexto: string;

  @Exclude()
  fechaCreacion: Date;

  @Exclude()
  fechaModificacion: Date;

  @Exclude()
  fechaEliminacion: Date;

  @Expose()
  idGaleria: string;
}
