import { TestBed } from '@angular/core/testing';

import { SubscriberService } from './subscriber.service';

describe('SubscriberService', () => {
  let service: SubscriberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
