import { Expose } from 'class-transformer';

export class PaginaPermisoDto {
  @Expose()
  idPagina: number;

  @Expose()
  nombrePagina: string;

  @Expose()
  urlPagina: string;

  @Expose()
  iconoPagina: string;

  @Expose()
  orden: number;

  @Expose()
  permiso: {
    ver: boolean;
    crear: boolean;
    eliminar: boolean;
    actualizar: boolean;
  };
}
