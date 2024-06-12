import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
export declare class ImageService {
    private readonly imageRepository;
    constructor(imageRepository: Repository<Image>);
    create(createImageDto: CreateImageDto): Promise<Image>;
    findAll(): Promise<Image[]>;
    findOne(id: number): Promise<Image>;
    update(id: number, updateImageDto: UpdateImageDto): Promise<Image>;
    remove(id: number): Promise<void>;
}
