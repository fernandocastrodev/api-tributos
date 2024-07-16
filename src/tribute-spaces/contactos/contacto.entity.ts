import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Contacto {
  @Column({ primary: true, generated: true })
  idContacto: number;

  @Column()
  nombre: string;

  @Column({ nullable: false })
  correo: string;

  @Column()
  fono: string;

  @Column()
  descripcion: string;

  @CreateDateColumn({ nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaModificacion: Date;

  @DeleteDateColumn({ nullable: true })
  fechaEliminacion: Date;
}
