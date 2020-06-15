import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  orders: Array<any> = [];
  totalPrice: number;
  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.getBag();
  }

  private getBag(): void {
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      this.orders = JSON.parse(localStorage.getItem('products'));
    }
    this.total();
  }

  productCount(product: IProduct, countStatus: boolean) {
    if (countStatus) {
      product.count++;
    } else {
      if (product.count > 1) {
        product.count--;
      }
    }
    this.total();
    this.updateLocalProducts();
    this.orderService.bag.next(this.orders);
  }

  deleteProduct(product: IProduct) {
    const index = this.orders.findIndex(prod => prod.id === product.id);
    this.orders.splice(index, 1);
    this.total();
    this.updateLocalProducts();
    this.orderService.bag.next(this.orders);
  }

  private total() {
    this.totalPrice = this.orders.reduce((total, elem) => {
      return total + ((elem.sale == true) ? ((elem.price - elem.price / 100 * elem.saleRate) * elem.count) : (elem.price * elem.count));
    }, 0);
  }

  private updateLocalProducts(): void {
    localStorage.setItem('products', JSON.stringify(this.orders));
  }

}
