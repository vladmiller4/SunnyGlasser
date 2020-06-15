import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  bag: Subject<any> = new Subject<any>();
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/orders';
  }

  getOrder(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>(this.url);
  }

  addOrder(order: IOrder): Observable<Array<IOrder>> {
    return this.http.post<Array<IOrder>>(this.url, order);
  }

  deleteOrder(order: IOrder): Observable<Array<IOrder>> {
    return this.http.delete<Array<IOrder>>(`${this.url}/${order.id}`);
  }

  updateOrder(order: IOrder): Observable<Array<IOrder>> {
    return this.http.put<Array<IOrder>>(`${this.url}/${order.id}`, order);
  }

  getCurrentOrder(order: IOrder): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.url}/${order.id}`);
  }

  getUserOrders(): Observable<Array<IOrder>> {
    let localUser = JSON.parse(localStorage.getItem('user'));
    return this.http.get<Array<IOrder>>(`${this.url}?userOrder.id=${localUser.id}`);
  }
}
