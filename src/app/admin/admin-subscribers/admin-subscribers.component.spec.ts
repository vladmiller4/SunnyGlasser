import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubscribersComponent } from './admin-subscribers.component';

describe('AdminSubscribersComponent', () => {
  let component: AdminSubscribersComponent;
  let fixture: ComponentFixture<AdminSubscribersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubscribersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
