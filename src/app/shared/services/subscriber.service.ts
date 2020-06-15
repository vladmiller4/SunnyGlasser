import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubscriber } from '../interfaces/subscriber.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/subscribers';
  }

  getSubscriber(): Observable<Array<ISubscriber>> {
    return this.http.get<Array<ISubscriber>>(this.url);
  }

  addSubscriber(subscriber: ISubscriber): Observable<Array<ISubscriber>> {
    return this.http.post<Array<ISubscriber>>(this.url, subscriber);
  }

  deleteSubscriber(subscriber: ISubscriber): Observable<Array<ISubscriber>> {
    return this.http.delete<Array<ISubscriber>>(`${this.url}/${subscriber.id}`);
  }

  updateSubscriber(subscriber: ISubscriber): Observable<Array<ISubscriber>> {
    return this.http.put<Array<ISubscriber>>(`${this.url}/${subscriber.id}`, subscriber);
  }

}
