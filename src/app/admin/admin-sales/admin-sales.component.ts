import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { SalesService } from 'src/app/shared/services/sales.service';

@Component({
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.component.html',
  styleUrls: ['./admin-sales.component.scss']
})
export class AdminSalesComponent implements OnInit {
  products: Array<IProduct> = [];
  sales: Array<IProduct> = [];
  constructor(private productService: ProductService, private saleService: SalesService) { }

  ngOnInit(): void {
    this.getProduct();
    this.getSale();
  }

  private getProduct(): void {
    this.productService.getProduct().subscribe(
      data => {
        this.products = data;
      }
    );
  }

  private getSale(): void {
    this.saleService.getSale().subscribe(
      data => {
        this.sales = data;
      }
    );
  }

  saleAdd(product): void {
    if (product.sale == false && product.saleRate > 0) {
      product.sale = true;
      this.saleService.addSale(product).subscribe(() => {
        this.getSale();
      })
    } else if (product.sale == true) {
      product.sale = false;
      product.saleRate = 0;
      this.saleService.deleteSale(product).subscribe(() => {
        this.getSale();
      })
    }

    this.productService.updateProduct(product).subscribe(() => {
      this.getProduct();
    })
  }

}
