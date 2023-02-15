import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit{
  faList = faList;
  categoryForm!: FormGroup;

  constructor(private catService: CategoryService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      description: new FormControl('',[Validators.required, Validators.minLength(2)])
    });
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.route.paramMap.subscribe(() => { this.getCategoryById(id); });
  }

  getCategoryById(id: number) {
    this.catService.getCategoryById(id).subscribe(
      (response: Category) => this.categoryForm.patchValue({
        description: response.description
      })
    )
  }

  onSubmit():any{
    const category: Category = this.categoryForm.value as Category;
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.catService.updateCategory(category, id).subscribe(
      data => this.catService.updateCategories(data)
    );
    this.router.navigate(['/category-list']);
  }
}
