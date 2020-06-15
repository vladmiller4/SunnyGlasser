import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Router, NavigationEnd, Event } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userLoginStatus: boolean;
  getProduct: Array<IProduct> = [];
  storage: boolean;
  user: IUser;
  burger: boolean;
  burgerStatus: boolean;
  accStatus: boolean;
  constructor(private orderService: OrdersService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.burgerStatus = false;
        this.burger = false;
      }
    })
  }

  ngOnInit(): void {
    this.productLength();
    this.getLocalStorage();
    this.getUser();
  }

  private productLength(): void {
    this.orderService.bag.subscribe(
      () => {
        this.getLocalStorage();
      }
    );
  }

  private getLocalStorage(): void {
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      this.storage = false;
      this.getProduct = JSON.parse(localStorage.getItem('products'));
    }
    if (this.getProduct.length == 0) {
      this.storage = true;
    }
  }

  private getUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      this.userLoginStatus = true;
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.userLoginStatus = false;
    }
  }

  loginStatus(): void {
    this.getUser();
    if (this.userLoginStatus) {
      if (this.user.email != 'admin@gmail.com') {
        this.accStatus = true;
        this.router.navigate(['account']);
      } else {
        this.router.navigate(['admin']);
      }
    } else {
      this.accStatus = false;
      this.router.navigate(['login']);
    }
  }

  loginStatus2(): void {
    // this.getUser();
    // if (this.userLoginStatus) {
    this.router.navigate(['favorites']);
    // } else {
    //   this.router.navigate(['login']);
    // }
  }

  navSlide(): void {
    this.getUser();
    if (this.burgerStatus == true) {
      this.burgerStatus = false;
    } else {
      this.burgerStatus = true;
    }
    this.burger = !this.burger;
  }

}
