import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Perfil } from '../perfiles/perfil.entity';
import { Pagina } from '../paginas/pagina.entity';

@Entity()
export class Permiso {
  @Column({ primary: true, generated: true })
  idPermiso: number;

  @Column({ type: 'boolean', default: true })
  ver: boolean;

  @Column({ type: 'boolean', default: false })
  crear: boolean;

  @Column({ type: 'boolean', default: false })
  eliminar: boolean;

  @Column({ type: 'boolean', default: false })
  actualizar: boolean;

  @CreateDateColumn({ nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaModificacion: Date;

  @DeleteDateColumn({ nullable: true })
  fechaEliminacion: Date;

  @ManyToOne(() => Pagina, { eager: true, nullable: false })
  @JoinColumn({ name: 'idPagina' })
  pagina: Pagina;

  @ManyToOne(() => Perfil, { eager: true, nullable: false })
  @JoinColumn({ name: 'idPerfil' })
  perfil: Perfil;
}
