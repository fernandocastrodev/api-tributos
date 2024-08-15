import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Plantilla {
  @PrimaryGeneratedColumn('uuid')
  idPlantilla: string;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  correo: string;

  @Column({ nullable: false, length: 1000 })
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
