/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Image } from '../images/image.entity';

@Entity('details')
export class DetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column('text')
  description: string;

  @Column({
    type: 'float',
    default: 0,
  })
  price: number;

  @Column()
  slug: string;

  

  @OneToMany( type => Image, image => image.detail)
  images: Image[];
}