import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Subject<any> = new Subject<any>();
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/users';
  }

  getUser(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(this.url);
  }

  addUser(user: IUser): Observable<Array<IUser>> {
    return this.http.post<Array<IUser>>(this.url, user);
  }

  deleteUser(user: IUser): Observable<Array<IUser>> {
    return this.http.delete<Array<IUser>>(`${this.url}/${user.id}`);
  }

  updateUser(user: IUser): Observable<Array<IUser>> {
    return this.http.put<Array<IUser>>(`${this.url}/${user.id}`, user);
  }

  getCurrentUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/${id}`)
  }

}
