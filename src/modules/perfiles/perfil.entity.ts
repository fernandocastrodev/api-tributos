import { Permiso } from '../permisos/permiso.entity';
import { Usuario } from '../usuarios/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Perfil {
  @PrimaryGeneratedColumn('uuid')
  idPerfil: string;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @CreateDateColumn({ nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaModificacion: Date;

  @DeleteDateColumn({ nullable: true })
  fechaEliminacion: Date;

  @OneToMany(() => Usuario, (usuario) => usuario.perfil)
  usuarios: Usuario[];

  @OneToMany(() => Permiso, (permiso) => permiso.perfil)
  permisos: Permiso[];
}
