import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { Product } from 'src/app/shared/models/product.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.scss']
})
export class AdminProductsListComponent implements OnInit {
  products: Array<IProduct> = [];
  categories: Array<ICategory> = [];
  productCategory: ICategory;
  categoryName: string;
  brands: Array<string> = ['Barton Perreira', 'Bulgari', 'Burberry', 'Chanel', 'Dior', 'Dolce Gabbana', 'Emporio Armani', 'Fendi', 'Giorgio Armani', 'Gucci', 'Michael Kors', 'Oakley', 'Prada', 'Ray-Ban', 'Tiffany Co.', 'Tom Ford', 'Valentino', 'Versace', 'Vogue'];
  shapes: Array<string> = ['Square', 'Rectangle', 'Round', 'Pilot', 'Geometrical', 'Oval', 'Irregular'];
  colors: Array<string> = ['Black', 'White', 'Tortoise', 'Gold', 'Grey', 'Silver', 'Brown', 'Blue', 'Green', 'Orange', 'Yellow', 'Violet', 'Red', 'Pink', 'Beige', 'Transperent', 'Multicolor'];
  materials: Array<string> = ['Metal', 'Nylon', 'Steel', 'Titanium', 'Plastic', 'Carbon', 'Aluminium', 'Injected', 'Other material'];
  lenses: Array<string> = ['Glass', 'Not glass'];
  brand: string;
  model: string;
  price: number;
  shape: string;
  color: string;
  material: string;
  lens: string;
  productEditID: string;
  private subscription: Subscription;
  modalRef: BsModalRef;
  imageList: string;
  image1: string;
  image2: string;
  image3: string;
  constructor(private productService: ProductService, private modalService: BsModalService, private categoriesService: CategoriesService, private afStorage: AngularFireStorage) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.getData();
    this.getCategory();
    this.getProduct();
  }

  private getCategory(): void {
    this.categoriesService.getCategory().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  private getProduct(): void {
    this.productService.getProduct().subscribe(
      data => {
        this.products = data;
      }
    )
  }

  private getData(): void {
    this.subscription = this.productService.getProduct().subscribe(data => {
      this.products = data;
    }, error => {
      console.log(error);

    })
  }

  deleteProduct(product: IProduct): void {
    this.productService.deleteProduct(product).subscribe(() => {
      this.getData();
    })
  }

  editProduct(product: IProduct): void {
    this.productEditID = product.id;
    this.productCategory = product.category;
    this.brand = product.brand;
    this.model = product.model;
    this.price = product.price;
    this.shape = product.shape;
    this.color = product.color;
    this.material = product.material;
    this.lens = product.lens;
    this.imageList = product.imageList;
    this.image1 = product.image1;
    this.image2 = product.image2;
    this.image3 = product.image3;
  }

  setCategory(): void {
    const index = this.categories.findIndex(elem => elem.name.toLocaleLowerCase() === this.categoryName.toLocaleLowerCase());
    this.productCategory = this.categories[index];
  }

  saveProduct(): void {
    const editProduct: IProduct = new Product(this.productEditID,
      this.productCategory,
      this.brand, this.model,
      this.price, this.shape,
      this.color, this.material,
      this.lens, false, 0, 1,
      this.imageList, this.image1,
      this.image2, this.image3);
    this.productService.updateProduct(editProduct).subscribe(() => {
      this.getData();
    })
    this.modalRef.hide();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
