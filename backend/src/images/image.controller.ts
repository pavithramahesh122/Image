/* eslint-disable prettier/prettier */
// src/image/image.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const image = await this.imageService.findOne(+id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    return image;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.imageService.remove(id);
  }
}
