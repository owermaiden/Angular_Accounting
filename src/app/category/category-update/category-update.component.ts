import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/common/category';
import { CatsService } from 'src/app/services/cats.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit{
  faList = faList;
  categoryForm!: FormGroup;

  constructor(
              private service:CatsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      description: new FormControl('',[Validators.required, Validators.minLength(2)])
    });
    this.getCategory();
  }


  getCategory(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.service.getCategory(id)
      .subscribe( (response: Category) => this.categoryForm.patchValue({
        description: response.description
      }));
  }

  onSubmit(){
    const category: Category = this.categoryForm.value as Category;
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.service.updateCat(category, id)
        .subscribe(() => this.router.navigate(['/category-list']));
  }
}
