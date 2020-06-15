import { IUser } from '../interfaces/user.interface';
import { IProduct } from '../interfaces/product.interface';

export class User implements IUser {
    constructor(
        public id: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public addresLine?: string,
        public city?: string,
        public zipCode?: string,
        public phone?: string,
        public addresLine2?: string,
        public favorites?: Array<IProduct>
    ) { }
}