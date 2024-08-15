import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permiso } from '../permisos/permiso.entity';

@Entity()
export class Pagina {
  @PrimaryGeneratedColumn('uuid')
  idPagina: string;

  @Column()
  nombrePagina: string;

  @Column({ nullable: true })
  descripcionPagina: string;

  @Column({ nullable: true })
  urlPagina: string;

  @Column({ nullable: true })
  iconoPagina: string;

  @Column({ nullable: false, default: 99 })
  orden: number;

  @CreateDateColumn({ nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaModificacion: Date;

  @DeleteDateColumn({ nullable: true })
  fechaEliminacion: Date;

  @OneToMany(() => Permiso, (permiso) => permiso.pagina)
  permisos: Permiso[];
}
