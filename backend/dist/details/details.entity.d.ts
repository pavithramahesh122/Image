import { Image } from '../images/image.entity';
export declare class DetailEntity {
    id: string;
    created: Date;
    name: string;
    model: string;
    description: string;
    price: number;
    slug: string;
    images: Image[];
}
