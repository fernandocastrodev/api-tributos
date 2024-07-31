import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { TipoGaleria } from '../tipo-galerias/tipo-galeria.entity';
import { Tributo } from '../tributos/tributo.entity';

@Entity()
export class Galeria {
  @Column({ primary: true, generated: true })
  idGaleria: number;

  @Column({ nullable: false, default: 99 })
  orden: number;

  @CreateDateColumn({ nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ nullable: true })
  fechaModificacion: Date;

  @DeleteDateColumn({ nullable: true })
  fechaEliminacion: Date;

  @ManyToOne(() => TipoGaleria, { eager: true, nullable: false })
  @JoinColumn({ name: 'idTipoGaleria' })
  tipoGaleria: TipoGaleria;

  @ManyToOne(() => Tributo, { eager: true, nullable: false })
  @JoinColumn({ name: 'idTributo' })
  tributo: Tributo;
}
