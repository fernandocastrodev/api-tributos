import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TipoGaleria {
  @PrimaryGeneratedColumn('uuid')
  idTipoGaleria: string;

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
