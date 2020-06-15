import { ICategory } from './category.interface';

export interface IProduct {
    id: string;
    category: ICategory;
    brand: string;
    model: string;
    price: number;
    shape: string;
    color: string;
    material: string;
    lens: string;
    sale: boolean;
    saleRate: number;
    count: number;
    imageList: string;
    image1?: string;
    image2?: string;
    image3?: string;
    favoriteStatus?: boolean;
}