import { ISubscriber } from '../interfaces/subscriber.interface';

export class Subscriber implements ISubscriber {
    constructor(
        public id: string,
        public email: string
    ){}
}