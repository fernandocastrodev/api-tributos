import { Exclude, Expose, Transform } from 'class-transformer';
import { Perfil } from '../../../modules/perfiles/perfil.entity';
export class FindAllUsuarioDto {
  @Expose()
  idUsuario: number;

  @Expose()
  nombre: string;

  @Expose()
  apellido: string;

  @Expose()
  rut: string;

  @Exclude()
  usuarioAcceso: string;

  @Exclude()
  claveAcceso: string;

  @Expose()
  correo: string;

  @Expose()
  genero: string;

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
    idPerfil: obj.perfil.idPerfil,
    nombre: obj.perfil.nombre,
  }))
  perfil: { idPerfil: string; nombre: string };
}
