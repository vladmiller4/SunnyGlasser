import { IProduct } from './product.interface';
import { IUserOrder } from './userorder.interface';

export interface IOrder {
    id: string;
    orderDetails: Array<IProduct>;
    totalPayment: number;
    userFirstName: string;
    userLastName: string;
    userAddresLine: string;
    userCity: string;
    userZipCode: string;
    userPhone: string;
    userEmail: string;
    userOrder: IUserOrder; 
    userDate: Date; 
    orderUserArray: Array<IOrder>; 
    userAddresLine2?: string;
}