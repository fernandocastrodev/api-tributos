import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Suscripcion } from '../suscripciones/suscripcion.entity';

@Entity()
export class Tributo {
  @Column({ primary: true, generated: true })
  idTributo: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  apellido: string;

  @Column({ nullable: false })
  rut: string;

  @Column({ nullable: false })
  fechaNacimiento: Date;

  @Column({ nullable: false })
  fechaDefuncion: Date;

  @Column({ nullable: false })
  qr: string;

  @Column({ nullable: false })
  urlPersonalizada: string;

  @CreateDateColumn({ nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaModificacion: Date;

  @DeleteDateColumn({ nullable: true })
  fechaEliminacion: Date;

  @ManyToOne(() => Suscripcion, { eager: true, nullable: false })
  @JoinColumn({ name: 'idSuscripcion' })
  suscripcion: Suscripcion;
}
