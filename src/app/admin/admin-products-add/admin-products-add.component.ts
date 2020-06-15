import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Product } from 'src/app/shared/models/product.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-products-add',
  templateUrl: './admin-products-add.component.html',
  styleUrls: ['./admin-products-add.component.scss']
})
export class AdminProductsAddComponent implements OnInit {
  categories: Array<ICategory> = [];
  categoryName: string;

  products: Array<IProduct> = [];
  brands: Array<string> = ['Bulgari', 'Burberry', 'Chanel', 'Сhristian Dior', 'Dolce Gabbana', 'Emporio Armani', 'Fendi', 'Giorgio Armani', 'Gucci', 'Michael Kors', 'Oakley', 'Prada', 'Ray-Ban', 'Tiffany Co.', 'Tom Ford', 'Valentino', 'Versace'];
  shapes: Array<string> = ['Square', 'Rectangle', 'Round', 'Pilot', 'Geometrical', 'Oval', 'Irregular', 'Cat Eye'];
  colors: Array<string> = ['Black', 'White', 'Tortoise', 'Gold', 'Grey', 'Silver', 'Brown', 'Blue', 'Green', 'Orange', 'Yellow', 'Violet', 'Red', 'Pink', 'Beige', 'Transperent', 'Multicolor'];
  materials: Array<string> = ['Metal', 'Nylon', 'Steel', 'Titanium', 'Plastic', 'Carbon', 'Aluminium', 'Injected', 'Other material'];
  lenses: Array<string> = ['Glass', 'Not glass'];
  productCategory: ICategory = { id: 1, name: 'Men' };
  brand: string = 'Choose brand';
  model: string;
  price: number;
  shape: string = 'Choose shape';
  color: string = 'Choose color';
  material: string = 'Choose material';
  lens: string = 'Choose lens';
  images: Array<string> = [];
  image: string;
  textContent: string;
  private subscription: Subscription;
  constructor(private productService: ProductService, private categoriesService: CategoriesService, private afStorage: AngularFireStorage) { }

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
    );
  }

  setCategory(): void {
    const index = this.categories.findIndex(elem => elem.name.toLocaleLowerCase() === this.categoryName.toLocaleLowerCase());
    this.productCategory = this.categories[index];
  }

  uploadFile(event) { // uploadFileToFirebase
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.image = url;
        this.images.push(this.image);
      });
    });
  }

  uuid(): string { // imageIDgeneration
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private getData(): void {
    this.subscription = this.productService.getProduct().subscribe(data => {
      this.products = data;
    }, error => {
      console.log(error);

    })
  }

  addProduct(): void {
    const newProduct: IProduct = new Product(this.ID(),
      this.productCategory,
      this.brand,
      this.model,
      this.price,
      this.shape,
      this.color,
      this.material,
      this.lens,
      false,
      0,
      1,
      this.images[0],
      this.images[1],
      this.images[2],
      this.images[3]);
    // if (this.products.length > 0) {
    //   newProduct.id = this.products.slice(-1)[0].id + 1;
    // }
    this.productService.addProduct(newProduct).subscribe(() => {
      this.getData();
    })
    this.resetForm();
    this.images = [];
  }

  public ID() {
    return Math.random().toString(36).substr(2, 8);
  }

  private resetForm(): void {
    this.brand = 'Choose brand';
    this.model = '';
    this.price = 0;
    this.shape = 'Choose shape';
    this.color = 'Choose color';
    this.material = 'Choose material';
    this.lens = 'Choose lens';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
