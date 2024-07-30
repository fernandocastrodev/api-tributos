import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TipoGaleria {
  @Column({ primary: true, generated: true })
  idTipoGaleria: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: true, length: 500 })
  descipcion: string;

  @CreateDateColumn({ nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaModificacion: Date;

  @DeleteDateColumn({ nullable: true })
  fechaEliminacion: Date;
}
