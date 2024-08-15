import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TipoGaleria } from '../tipo-galerias/tipo-galeria.entity';
import { Tributo } from '../tributos/tributo.entity';
import { Imagen } from '../imagenes/imagen.entity';
import { Texto } from '../textos/texto.entity';
import { Video } from '../videos/video.entity';

@Entity()
export class Galeria {
  @PrimaryGeneratedColumn('uuid')
  idGaleria: string;

  @Column({ nullable: false })
  nombre: string;
  
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

  @OneToMany(() => Imagen, (imagen) => imagen.galeria)
  imagenes: Imagen[];

  @OneToMany(() => Texto, (texto) => texto.galeria)
  textos: Texto[];

  @OneToMany(() => Video, (video) => video.galeria)
  videos: Video[];
}
