import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favorite: Subject<any> = new Subject<any>();
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/favorites';
  }

  getFavorite(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }

  addFavorite(favorite: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.url, favorite);
  }

  deleteFavorite(favorite: IProduct): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.url}/${favorite.id}`);
  }

  updateFavorite(favorite: IProduct): Observable<Array<IProduct>> {
    return this.http.put<Array<IProduct>>(`${this.url}/${favorite.id}`, favorite);
  }

  getCurrentFavorite(favorite: IProduct): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${favorite.id}`);
  }
}
