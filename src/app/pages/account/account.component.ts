import { Component, OnInit, TemplateRef } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  users: Array<IUser> = [];
  arrUserOrders: Array<IOrder> = [];
  ordersStatus: boolean = false;
  user: IUser;
  modalRef: BsModalRef;
  city: string;
  addresLine: string;
  zipCode: string;
  phone: string;
  public phoneMask = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(private modalService: BsModalService, private userService: UserService, private authentication: AuthenticationService, private ordersService: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserOrders();
  }

  private getUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  signOut() {
    this.authentication.logout();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  openModal(template: TemplateRef<any>) {
    this.city = this.user.city;
    this.addresLine = this.user.addresLine;
    this.zipCode = this.user.zipCode;
    this.phone = this.user.phone;
    this.modalRef = this.modalService.show(template);
  }

  saveBook(): void {
    const editUser: IUser = new User(this.user.id, this.user.firstname, this.user.lastname, this.user.email, this.user.password, this.addresLine, this.city, this.zipCode, this.phone);
    this.userService.updateUser(editUser).subscribe(() => {
      this.getUser();
    })
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(editUser));
    this.modalRef.hide();
  }

  getUserOrders(): void {
    this.ordersService.getUserOrders().subscribe(data => {
      this.arrUserOrders = data;
      if (this.arrUserOrders.length > 0) {
        this.ordersStatus = true;
      }
      else {
        this.ordersStatus = false;
      }
    });
  }

  deleteOrder(order: IOrder): void {
    this.ordersService.deleteOrder(order).subscribe(() => {
      this.getUserOrders();
    });
  }

}
