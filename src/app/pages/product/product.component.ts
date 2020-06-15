import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Array<IProduct> = [];
  product: IProduct;
  alsoLike: Array<IProduct> = [];
  constructor(private router: ActivatedRoute, private productService: ProductService, private location: Location, private orderService: OrdersService, private favoriteService: FavoriteService, private router2: Router) { }

  ngOnInit(): void {
    this.getProduct();
    this.getProducts();
    this.getAlsoLike();
  }

  private getProduct(): void {
    const id = this.router.snapshot.paramMap.get('id');
    this.productService.getCurrentProduct(id).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  private getProducts(): void {
    this.productService.getProduct().subscribe(data => {
      this.products = data;
    }, error => {
      console.log(error);
    })
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

  addToFavorites(product: IProduct): void {
    // if (localStorage.length > 0 && localStorage.getItem('user')) {
    let localFavorites: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('favorites')) {
      localFavorites = JSON.parse(localStorage.getItem('favorites'));
    }
    if (localFavorites.some(prod => prod.id === product.id)) { } else {
      product.favoriteStatus = true;
      localFavorites.push(product);
      localStorage.setItem('favorites', JSON.stringify(localFavorites));
    }
    this.favoriteService.favorite.next(localFavorites);
    // } else {
    //   this.router.navigate(['login']);
    // }
  }

  getAlsoLike(): void {
    this.productService.getProduct().subscribe(data => {
      this.products = data;
      this.products.forEach(product => {
        if (product.shape == this.product.shape && product.model == this.product.model) { }
        else if (product.shape == this.product.shape) {
          this.alsoLike.push(product)
        } else { }
      })
    });
  }

  goBack(): void {
    this.location.back();
  }

}
