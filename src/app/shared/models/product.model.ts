import { IProduct } from '../interfaces/product.interface';
import { ICategory } from '../interfaces/category.interface';

export class Product implements IProduct {
    constructor (
        public id: string,
        public category: ICategory,
        public brand: string,
        public model: string,
        public price: number,
        public shape: string,
        public color: string,
        public material: string,
        public lens: string,
        public sale: boolean,
        public saleRate: number,
        public count: number,
        public imageList: string,
        public image1?: string,
        public image2?: string,
        public image3?: string
    ) {}
}