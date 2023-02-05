import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('fishLog')
export default class FishLog {
  @PrimaryColumn()
  id?: string;

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

  @Column('simple-json')
  coordenates?: {
    latitude: number;
    longitude: number;
  };

  @Column('simple-json')
  coordenatesFake?: {
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
  visible?: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  updatedAt?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
