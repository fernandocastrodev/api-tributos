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
import { Usuario } from '../../modules/usuarios/usuario.entity';
import { Plan } from '../planes/plan.entity';

@Entity()
export class Suscripcion {
  @PrimaryGeneratedColumn('uuid')
  idSuscripcion: string;

  @Column({ nullable: false })
  @CreateDateColumn()
  fechaSuscripcion: Date;

  @Column({ type: 'boolean', default: false })
  estadoSuscripcion: boolean;

  @CreateDateColumn({ nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaModificacion: Date;

  @DeleteDateColumn({ nullable: true })
  fechaEliminacion: Date;

  @ManyToOne(() => Usuario, { eager: true, nullable: false })
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @ManyToOne(() => Plan, { eager: true, nullable: false })
  @JoinColumn({ name: 'idPlan' })
  plan: Plan;
}
