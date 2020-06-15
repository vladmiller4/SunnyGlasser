import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ISubscriber } from 'src/app/shared/interfaces/subscriber.interface';
import { SubscriberService } from 'src/app/shared/services/subscriber.service';
import { Subscriber } from 'src/app/shared/models/subscriber.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<IProduct> = [];
  subscribers: Array<ISubscriber> = [];
  subscriber = {
    email: ''
  }
  constructor(private productService: ProductService, private subscriberService: SubscriberService) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.productService.getProduct().subscribe(data => {
      this.products = data.filter(product => product.saleRate === 50).slice(0, 3);
    }, error => {
      console.log(error);
    })
  }

  addSubscriber(): void {
    const newSubscriber: ISubscriber = new Subscriber(this.ID(), this.subscriber.email);
    this.subscriberService.addSubscriber(newSubscriber).subscribe(() => {
      this.getData();
    })
    this.subscriber.email = '';
  }

  public ID() {
    return '_' + Math.random().toString(36).substr(2, 6);
  }
}
