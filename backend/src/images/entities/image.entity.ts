/* eslint-disable prettier/prettier */
// src/image/image.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ default: 'active' })
  status: string;

  @Column('json', { nullable: true })
  data: any;
}


