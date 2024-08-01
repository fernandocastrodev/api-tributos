import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Galeria } from '../galerias/galeria.entity';

@Entity()
export class Texto {
  @Column({ primary: true, generated: true })
  idTexto: number;

  @Column({ nullable: false, length: 500 })
  texto: string;

  @Column({ nullable: false })
  tipoTexto: string;

  @CreateDateColumn({ nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaModificacion: Date;

  @DeleteDateColumn({ nullable: true })
  fechaEliminacion: Date;

  @ManyToOne(() => Galeria, { eager: true, nullable: false })
  @JoinColumn({ name: 'idGaleria' })
  galeria: Galeria;
}
