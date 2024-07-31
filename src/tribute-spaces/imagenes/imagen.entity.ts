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
export class Imagen {
  @Column({ primary: true, generated: true })
  idImagen: number;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: true, length: 500 })
  texto: string;

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
