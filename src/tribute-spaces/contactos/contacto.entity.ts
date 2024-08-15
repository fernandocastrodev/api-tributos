import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Contacto {
  @PrimaryGeneratedColumn('uuid')
  idContacto: string;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  correo: string;

  @Column({ nullable: true })
  fono: string;

  @Column({ nullable: false, length: 500 })
  descripcion: string;

  @CreateDateColumn({ nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaModificacion: Date;

  @DeleteDateColumn({ nullable: true })
  fechaEliminacion: Date;
}
