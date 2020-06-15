import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { Order } from 'src/app/shared/models/order.model';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { IUserOrder } from 'src/app/shared/interfaces/userorder.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  orders: Array<any> = [];
  ordersProceed: Array<any> = [];
  userOrder: IUserOrder;
  totalPrice: number;
  orderUserArray: Array<IOrder>;
  user = {
    firstname: '',
    lastname: '',
    addressline: '',
    city: '',
    zipcode: '',
    phone: '',
    email: '',
    addressline2: ''
  }
  currentUser: IUser;
  public phoneMask = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getBag();
    this.getOrder();
    this.getUser();
  }

  private getOrder(): void {
    this.ordersService.getOrder().subscribe(
      data => {
        this.ordersProceed = data;
      }
    );
  }

  private getUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      this.user.firstname = this.currentUser.firstname;
      this.user.lastname = this.currentUser.lastname;
      this.user.addressline = this.currentUser.addresLine;
      this.user.city = this.currentUser.city;
      this.user.zipcode = this.currentUser.zipCode;
      this.user.phone = this.currentUser.phone;
      this.user.email = this.currentUser.email;
    }
  }

  public addOrder(): void {
    let date = new Date;
    let user = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem('user')) {
      this.userOrder = { id: user.id, email: user.email };
    } else {
      this.userOrder = { id: '', email: '' };
    }
    const id = this.ID();
    const order: IOrder = new Order(id, this.orders, this.totalPrice,
      this.user.firstname, this.user.lastname, this.user.addressline,
      this.user.city, this.user.zipcode, this.user.phone, this.user.email,
      this.userOrder, date, this.orderUserArray, this.user.addressline2);
    this.orders = [];
    localStorage.setItem('products', JSON.stringify(this.orders));
    this.ordersService.bag.next(this.orders);
    this.ordersService.addOrder(order).subscribe(
      () => {
        this.getOrder();
      });
  }

  public ID() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  private getBag(): void {
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      this.orders = JSON.parse(localStorage.getItem('products'));
    }
    this.total();
  }

  private total() {
    this.totalPrice = this.orders.reduce((total, elem) => {
      return total + ((elem.sale == true) ? ((elem.price - elem.price / 100 * elem.saleRate) * elem.count) : (elem.price * elem.count));
    }, 0);
  }
}

