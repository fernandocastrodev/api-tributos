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
import { Suscripcion } from '../suscripciones/suscripcion.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn('uuid')
  idPago: string;

  @Column({ nullable: false })
  fecha: Date;

  @Column({ nullable: false })
  token: string;

  @Column({ nullable: false })
  monto: number;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

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
