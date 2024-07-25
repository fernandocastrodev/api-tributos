import { Perfil } from '../perfiles/perfil.entity';
import {
  Entity,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @Column({ primary: true, generated: true })
  idUsuario: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ nullable: true })
  rut: string;

  @Column({ nullable: true })
  usuarioAcceso: string;

  @Column({ nullable: false })
  claveAcceso: string;

  @Column({ nullable: false })
  correo: string;

  @Column({ default: 'm' })
  genero: string;

  @Column({ type: 'boolean', default: false })
  estado: boolean;

  @CreateDateColumn({ nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaModificacion: Date;

  @DeleteDateColumn({ nullable: true })
  fechaEliminacion: Date;

  @ManyToOne(() => Perfil, { eager: true, nullable: false }) // para que traiga los perfiles
  @JoinColumn({ name: 'idPerfil' }) // Esto establece 'idPerfil' como la clave foránea
  perfil: Perfil;
}
