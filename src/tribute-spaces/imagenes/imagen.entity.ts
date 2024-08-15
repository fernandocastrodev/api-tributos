import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Galeria } from '../galerias/galeria.entity';

@Entity()
export class Imagen {
  @PrimaryGeneratedColumn('uuid')
  idImagen: string;

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
