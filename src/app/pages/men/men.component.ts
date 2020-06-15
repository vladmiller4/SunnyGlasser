import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { Router } from '@angular/router';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {
  products: Array<IProduct> = [];
  brands: Array<any> = [{ id: 0, brand: 'Bulgari', status: false }, { id: 1, brand: 'Burberry', status: false }, { id: 2, brand: 'Сhristian Dior', status: false }, { id: 3, brand: 'Dolce Gabbana', status: false }, { id: 4, brand: 'Emporio Armani', status: false }, { id: 5, brand: 'Fendi', status: false }, { id: 6, brand: 'Giorgio Armani', status: false }, { id: 7, brand: 'Gucci', status: false }, { id: 8, brand: 'Michael Kors', status: false }, { id: 9, brand: 'Oakley', status: false }, { id: 10, brand: 'Prada', status: false }, { id: 11, brand: 'Ray-Ban', status: false }, { id: 12, brand: 'Tiffany Co.', status: false }, { id: 13, brand: 'Tom Ford', status: false }, { id: 14, brand: 'Valentino', status: false }, { id: 15, brand: 'Versace', status: false }];
  shapes: Array<any> = [{ id: 0, shape: 'Square', status: false }, { id: 1, shape: 'Rectangle', status: false }, { id: 2, shape: 'Round', status: false }, { id: 3, shape: 'Pilot', status: false }, { id: 4, shape: 'Geometrical', status: false }, { id: 5, shape: 'Oval', status: false }, { id: 6, shape: 'Irregular', status: false }, { id: 7, shape: 'Cat Eye', status: false }];
  fBrandStatus: boolean = false;
  categoryName: string = 'Men';
  categoryName2: string = 'Men';
  chosenBrands: Array<string> = [];
  chosenShapes: Array<string> = [];
  favoriteStatus: boolean;
  minValue: number = 0;
  maxValue: number = 500;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };
  constructor(private productService: ProductService, private orderService: OrdersService, private favoriteService: FavoriteService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.productService.getProduct().subscribe(data => {
      this.products = data.filter(product => product.category.name === 'Men');
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

  redirectProduct(product: IProduct): void {
    this.router.navigate(['/product', product.id])
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

  filterBrand(): void {
    this.fBrandStatus = !this.fBrandStatus;
  }


  brandFilterFunction(brand): void {
    if (brand.status == false) {
      brand.status = true;
      this.chosenBrands.push(brand.brand);
    } else if (brand.status == true) {
      brand.status = false;
      let brandID = this.chosenBrands.findIndex(elem => elem == brand.brand);
      this.chosenBrands.splice(brandID, 1);
    }
    this.productService.getProductBrand(this.chosenBrands, this.categoryName, this.categoryName2).subscribe(data => {
      this.products = data;
    });
    if (this.chosenBrands.length < 1) {
      this.getData();
    }
  }

  shapeFilterFunction(shape): void {
    if (shape.status == false) {
      shape.status = true;
      this.chosenShapes.push(shape.shape);
    } else if (shape.status == true) {
      shape.status = false;
      let shapeID = this.chosenShapes.findIndex(elem => elem == shape.shape);
      this.chosenShapes.splice(shapeID, 1);
    }
    this.productService.getProductShape(this.chosenShapes, this.categoryName, this.categoryName2).subscribe(data => {
      this.products = data;
    });
    if (this.chosenShapes.length < 1) {
      this.getData();
    }

  }

  priceFilterFunction(): void {
    this.productService.getPriceFilter(this.categoryName, this.categoryName2, this.minValue, this.maxValue).subscribe((data => {
      this.products = data;
    }))
  }

  goTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }

}
