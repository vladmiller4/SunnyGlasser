import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  categoryID: number;
  editStatus: boolean;
  categories: Array<ICategory> = [];
  category = {
    name: ''
  }
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  private getCategory(): void {
    this.categoriesService.getCategory().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  public addCategory(): void {
    const category: ICategory = new Category(1, this.category.name);
    if (!this.editStatus) {
      if (this.categories.length > 0) {
        category.id = this.categories.slice(-1)[0].id + 1;
      }
      this.categoriesService.addCategory(category).subscribe(
        () => {
          this.getCategory();
        });
    }
    else {
      category.id = this.categoryID;
      this.categoriesService.updateCategory(category).subscribe(() => {
        this.getCategory();
      });
      this.editStatus = false;
    }
    this.category.name = '';
  }

  public deleteCategory(category: ICategory): void {
    this.categoriesService.deleteCategory(category).subscribe(
      () => {
        this.getCategory();
      }
    );
  }

  public editCategory(category: ICategory): void {
    this.categoryID = category.id;
    this.category.name = category.name;
    this.editStatus = true;
  }

}
