import { Exclude, Expose } from 'class-transformer';

export class findOnePlantillaDto {
  @Expose()
  idPlantilla: number;

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
  fechaEliminacion: Date;
}
