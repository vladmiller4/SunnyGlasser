import { Component, OnInit } from '@angular/core';
import { SubscriberService } from 'src/app/shared/services/subscriber.service';
import { ISubscriber } from 'src/app/shared/interfaces/subscriber.interface';

@Component({
  selector: 'app-admin-subscribers',
  templateUrl: './admin-subscribers.component.html',
  styleUrls: ['./admin-subscribers.component.scss']
})
export class AdminSubscribersComponent implements OnInit {
  subscribers: Array<any> = [];

  constructor(private subscriberService: SubscriberService) { }

  ngOnInit(): void {
    this.getSubscriber();
  }

  private getSubscriber(): void {
    this.subscriberService.getSubscriber().subscribe(
      data => {
        this.subscribers = data;
      }
    );
  }

  public deleteSubscriber(subscriber: ISubscriber): void {
    this.subscriberService.deleteSubscriber(subscriber).subscribe(
      () => {
        this.getSubscriber();
      }
    );
  }

}
