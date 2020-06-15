import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsListComponent } from './admin-products-list.component';

describe('AdminProductsListComponent', () => {
  let component: AdminProductsListComponent;
  let fixture: ComponentFixture<AdminProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
