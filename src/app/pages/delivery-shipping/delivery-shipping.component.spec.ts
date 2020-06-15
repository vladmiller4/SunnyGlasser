import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryShippingComponent } from './delivery-shipping.component';

describe('DeliveryShippingComponent', () => {
  let component: DeliveryShippingComponent;
  let fixture: ComponentFixture<DeliveryShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
