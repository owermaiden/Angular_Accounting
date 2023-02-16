import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/common/category';
import { Product } from 'src/app/common/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit{
  faList = faList;
  productForm!: FormGroup;
  categories: Category[] = [];

  constructor(private productService: ProductService,
              private catService: CategoryService,
              private formBuilder: FormBuilder,
              private router: Router){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: new FormControl('',[Validators.required,Validators.minLength(2)]),
      lowLimitAlert: new FormControl('',[Validators.required]),
      productUnit: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required])
    });
    this.initPage();
  }

  initPage(): void {
    this.catService.fetchCtegories();
    this.catService.getCategories().subscribe(
      data => this.categories = data
    );
  }

  onSubmit(){
    const product: Product = this.productForm.value as Product;
    this.productService.createProduct(product).subscribe(
      data => this.productService.setProducts(data)
    );
    this.router.navigate(['/product-list']);
  }
}
