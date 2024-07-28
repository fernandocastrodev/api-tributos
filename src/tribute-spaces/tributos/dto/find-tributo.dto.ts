import { Expose } from 'class-transformer';

export class FindTributoDto {
  @Expose()
  idTributo: number;

  @Expose()
  nombre: string;

  @Expose()
  apellido: string;

  @Expose()
  rut: string;

  @Expose()
  fechaNacimiento: Date;

  @Expose()
  fechaDefuncion: Date;

  @Expose()
  idSubscripcion: number;

  @Expose()
  qr: string;

  @Expose()
  urlPersonalizada: string;
}
