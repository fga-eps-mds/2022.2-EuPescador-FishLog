import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fishLog')
export class FishLog {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  largeGroup?: string;

  @Column({ nullable: true })
  group?: string;

  @Column({ nullable: true })
  species?: string;

  @Column({ nullable: true })
  family?: string;

  @Column('simple-json' ,{ nullable: true })
  coordenates?: {
    latitude: number;
    longitude: number;
  };
  @Column({ nullable: true })
  photo?: string;

  @Column({ nullable: true })
  length?: number;

  @Column({ nullable: true })
  weight?: number;

  @Column({ nullable: true })
  reviewed?: boolean;

  @Column({ nullable: true })
  reviewedBy?: number;

  @Column({ nullable: true })
  visible?: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  updatedBy?: number;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column({ nullable: true })
  deletedBy?: number;
}
