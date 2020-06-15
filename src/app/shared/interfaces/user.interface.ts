import { IProduct } from './product.interface';

export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    addresLine?: string;
    city?: string;
    zipCode?: string;
    phone?: string;
    addresLine2?: string;
    favorites?: Array<IProduct>;
}