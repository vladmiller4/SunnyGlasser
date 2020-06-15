import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Array<IProduct> = [];
  constructor(private orderService: OrdersService, private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.getFavorite();
  }

  private getFavorite(): void {
    if (localStorage.length > 0 && localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
    }
  }

  addToBag(product: IProduct): void {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      localProducts = JSON.parse(localStorage.getItem('products'));
      if (localProducts.some(prod => prod.id === product.id)) {
        const index = localProducts.findIndex(prod => prod.id === product.id);
        localProducts[index].count += product.count;
      } else {
        localProducts.push(product);
      }
      localStorage.setItem('products', JSON.stringify(localProducts));
    } else {
      localProducts.push(product);
      localStorage.setItem('products', JSON.stringify(localProducts));
    }
    product.count = 1;
    this.orderService.bag.next(localProducts);
  }

  public updateLocalFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  deleteFavorite(product: IProduct) {
    product.favoriteStatus = false;
    const index = this.favorites.findIndex(prod => prod.id === product.id);
    this.favorites.splice(index, 1);
    this.updateLocalFavorites();
    this.favoriteService.favorite.next(this.favorites);
  }

}
