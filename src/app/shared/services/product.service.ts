import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
  }

  getProduct(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }

  addProduct(product: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.url, product);
  }

  deleteProduct(product: IProduct): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.url}/${product.id}`);
  }

  updateProduct(product: IProduct): Observable<Array<IProduct>> {
    return this.http.put<Array<IProduct>>(`${this.url}/${product.id}`, product);
  }

  getCurrentProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

  // Filters

  getProductGender(genders: Array<string>): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.name=${genders[0]}&category.name=${genders[1]}`);
  }

  getProductGender2(genders: Array<string>): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.name=${genders[0]}&category.name=${genders[1]}&sale=true`);
  }

  getProductBrand(brands: Array<string>, categoryName: string, categoryName2: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.name=${categoryName || categoryName2}&brand=${brands[0]}&brand=${brands[1]}&brand=${brands[2]}&brand=${brands[3]}&brand=${brands[4]}&brand=${brands[5]}&brand=${brands[6]}&brand=${brands[7]}&brand=${brands[8]}&brand=${brands[9]}&brand=${brands[10]}&brand=${brands[11]}&brand=${brands[12]}&brand=${brands[13]}&brand=${brands[14]}&brand=${brands[15]}&brand=${brands[16]}`);
  }

  getProductBrand2(brands: Array<string>): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?brand=${brands[0]}&brand=${brands[1]}&brand=${brands[2]}&brand=${brands[3]}&brand=${brands[4]}&brand=${brands[5]}&brand=${brands[6]}&brand=${brands[7]}&brand=${brands[8]}&brand=${brands[9]}&brand=${brands[10]}&brand=${brands[11]}&brand=${brands[12]}&brand=${brands[13]}&brand=${brands[14]}&brand=${brands[15]}&brand=${brands[16]}`);
  }

  getProductBrand3(brands: Array<string>): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?brand=${brands[0]}&brand=${brands[1]}&brand=${brands[2]}&brand=${brands[3]}&brand=${brands[4]}&brand=${brands[5]}&brand=${brands[6]}&brand=${brands[7]}&brand=${brands[8]}&brand=${brands[9]}&brand=${brands[10]}&brand=${brands[11]}&brand=${brands[12]}&brand=${brands[13]}&brand=${brands[14]}&brand=${brands[15]}&brand=${brands[16]}&sale=true`);
  }

  getProductShape(shapes: Array<string>, categoryName: string, categoryName2: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.name=${categoryName || categoryName2}&shape=${shapes[0]}&shape=${shapes[1]}&shape=${shapes[2]}&shape=${shapes[3]}&shape=${shapes[4]}&shape=${shapes[5]}&shape=${shapes[6]}&shape=${shapes[7]}`);
  }

  getProductShape2(shapes: Array<string>): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?shape=${shapes[0]}&shape=${shapes[1]}&shape=${shapes[2]}&shape=${shapes[3]}&shape=${shapes[4]}&shape=${shapes[5]}&shape=${shapes[6]}&shape=${shapes[7]}`);
  }
  getProductShape3(shapes: Array<string>): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?shape=${shapes[0]}&shape=${shapes[1]}&shape=${shapes[2]}&shape=${shapes[3]}&shape=${shapes[4]}&shape=${shapes[5]}&shape=${shapes[6]}&shape=${shapes[7]}&sale=true`);
  }

  getPriceFilter(categoryName: string, categoryName2: string, min, max): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.name=${categoryName || categoryName2}&price_gte=${min}&price_lte=${max}`);
  }

  getPriceFilter2(min, max): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?price_gte=${min}&price_lte=${max}`);
  }

  getPriceFilter3(min, max): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?price_gte=${min}&price_lte=${max}&sale=true`);
  }
}
