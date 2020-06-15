import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/product.interface';
import { NgModel } from '@angular/forms';
import { IUserOrder } from '../interfaces/userorder.interface';

export class Order implements IOrder {
    constructor (
        public id: string,
        public orderDetails: Array<IProduct>,
        public totalPayment: number,
        public userFirstName: string,
        public userLastName: string,
        public userAddresLine: string,
        public userCity: string,
        public userZipCode: string,
        public userPhone: string,
        public userEmail: string,
        public userOrder: IUserOrder,
        public userDate: Date,
        public orderUserArray: Array<IOrder>,
        public userAddresLine2?: string
    ) {}
}