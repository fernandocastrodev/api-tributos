import { Exclude, Expose } from 'class-transformer';

export class findOneContactoDto {
  @Expose()
  idContacto: string;

  @Expose()
  nombre: string;

  @Expose()
  correo: string;

  @Expose()
  fono: string;

  @Expose()
  descripcion: string;

  @Exclude()
  fechaCreacion: Date;

  @Exclude()
  fechaModificacion: Date;

  @Exclude()
  fechaEliminacion: Date;
}
