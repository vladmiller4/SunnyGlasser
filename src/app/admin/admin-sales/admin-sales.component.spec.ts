import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSalesComponent } from './admin-sales.component';

describe('AdminSalesComponent', () => {
  let component: AdminSalesComponent;
  let fixture: ComponentFixture<AdminSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
