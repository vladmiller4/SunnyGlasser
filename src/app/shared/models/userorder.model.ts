import { IUserOrder } from '../interfaces/userorder.interface';


export class OrderUsers implements IUserOrder {
    constructor(
        public id: string,
        public email: string,
    ) {
    }
}