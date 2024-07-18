import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Plan {
  @Column({ primary: true, generated: true })
  idPlan: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  precio: number;

  @Column({ nullable: false, length: 500 })
  descripcion: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @CreateDateColumn({ nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaModificacion: Date;

  @DeleteDateColumn({ nullable: true })
  fechaEliminacion: Date;
}
