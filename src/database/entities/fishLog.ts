import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('fishLog')
export class FishLog {
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }

  @PrimaryColumn()
  id?: string;

  @Column()
  name?: string;

  @Column()
  largeGroup?: string;

  @Column()
  group?: string;

  @Column()
  species?: string;

  @Column()
  family?: string;

  @Column('simple-json')
  coordenates?: {
    latitude: number;
    longitude: number;
  };

  @Column()
  photo?: string;

  @Column()
  length?: number;

  @Column()
  weight?: number;

  @Column()
  reviewed?: boolean;

  @Column()
  reviewedBy?: string;

  @Column()
  visible?: boolean;

  @Column()
  createdAt?: Date;

  @Column()
  createdBy?: string;

  @Column()
  updatedAt?: Date;

  @Column()
  updatedBy?: string;

  @Column()
  deletedAt?: Date;

  @Column()
  deletedBy?: string;
}
