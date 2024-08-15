import { Exclude, Expose } from 'class-transformer';

export class findOnePlantillaDto {
  @Expose()
  idPlantilla: string;

  @Expose()
  nombre: string;

  @Expose()
  correo: string;

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
