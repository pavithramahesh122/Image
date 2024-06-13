import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    create(createImageDto: CreateImageDto): Promise<import("./entities/image.entity").Image>;
    findAll(): Promise<import("./entities/image.entity").Image[]>;
    findOne(id: string): Promise<import("./entities/image.entity").Image>;
    update(id: number, updateImageDto: UpdateImageDto): Promise<import("./entities/image.entity").Image>;
    remove(id: number): Promise<void>;
}
