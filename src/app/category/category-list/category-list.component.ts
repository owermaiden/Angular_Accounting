import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faCirclePlus, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  faPlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faPen = faPen;
  categories: Category[] = [];
  error!: string;

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.categoryService.fetchCtegories();
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
    )
  }

  deleteCat(category: Category): void{
    this.categoryService.deleteCategory(category.id!).subscribe(
      (res: any) => {
        this.error = '';
        this.categoryService.fetchCtegories()
      },
      (err: any) => this.error = err
    );
  }
}
