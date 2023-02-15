import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  faList = faList;
  categoryForm!: FormGroup;

  constructor(private catService: CategoryService,
              private formBuilder: FormBuilder,
              private router: Router){}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      description: new FormControl('',[Validators.required, Validators.minLength(2)])
    });
  }


  onSubmit():any{
    const category: Category = this.categoryForm.value as Category;
    console.log(category);
    this.catService.createCategory(category).subscribe(
      data => this.catService.setCategories(data)
    );
    this.router.navigate(['/category-list']);
  }

}
