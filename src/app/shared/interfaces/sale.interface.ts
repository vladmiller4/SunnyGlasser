import { IProduct } from './product.interface';

export interface ISale {
    id: number;
    saleDetails: Array<IProduct>;
    salePrice: number;
    saleRate: number;
}