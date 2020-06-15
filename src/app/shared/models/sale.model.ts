import { ISale } from '../interfaces/sale.interface';
import { IProduct } from '../interfaces/product.interface';

export class Sale implements ISale {
    constructor (
        public id: number,
        public saleDetails: Array<IProduct>,
        public salePrice: number,
        public saleRate: number
    ) {}
}