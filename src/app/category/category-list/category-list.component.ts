import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faCirclePlus, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/common/category';
import { CatsService } from 'src/app/services/cats.service';

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

  constructor(private service: CatsService){}

  ngOnInit(): void {

    this.getCats();
  }

  getCats(){
    this.service.getCats().subscribe(
      categories => this.categories = categories
    );
  }

  delete(category: Category): void {
    this.categories = this.categories.filter(h => h !== category);
    this.service.deleteCat(category.id!).subscribe();
  }
}
