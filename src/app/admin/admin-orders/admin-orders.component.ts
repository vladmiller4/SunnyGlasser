import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IOrder } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: Array<any> = [];
  totalPrice: number;
  userFirstName: string;
  userLastName: string;
  userAddresLine: string;
  userRegion: string;
  userCity: string;
  userZipCode: string;
  userPhone: string;
  userEmail: string;
  userAddresLine2: string;
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrder();
  }

  private getOrder(): void {
    this.ordersService.getOrder().subscribe(
      data => {
        this.orders = data;
      }
    );
  }

  public deleteOrder(order: IOrder): void {
    this.ordersService.deleteOrder(order).subscribe(
      () => {
        this.getOrder();
      }
    );
  }

}
