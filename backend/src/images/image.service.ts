/* eslint-disable prettier/prettier */
// src/image/image.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  create(createImageDto: CreateImageDto): Promise<Image> {
    const image = this.imageRepository.create(createImageDto);
    return this.imageRepository.save(image);
  }

  findAll(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  findOne(id: number): Promise<Image> {
    return this.imageRepository.findOneBy({ id });
  }

  async update(id: number, updateImageDto: UpdateImageDto): Promise<Image> {
    const image = await this.findOne(id);
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    Object.assign(image, updateImageDto);
    return this.imageRepository.save(image);
  }

  async remove(id: number): Promise<void> {
    const image = await this.findOne(id);
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    await this.imageRepository.remove(image);
  }
}
