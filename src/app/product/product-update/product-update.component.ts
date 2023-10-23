import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/common/category';
import { Product } from 'src/app/common/product';
import { CatsService } from 'src/app/services/cats.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  faList = faList;
  productForm!: FormGroup;
  categories: Category[] = [];

  constructor(private productService: ProductService,
              private catService: CatsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
      this.initPage();
      this.productForm = this.formBuilder.group({
        name: new FormControl('',[Validators.required,Validators.minLength(2)]),
        lowLimitAlert: new FormControl('',[Validators.required]),
        productUnit: new FormControl('',[Validators.required]),
        category: new FormControl('',[Validators.required])
      });

      const id: number = +this.route.snapshot.paramMap.get('id')!;
      this.route.paramMap.subscribe(() => { this.getProductById(id); });
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      (response: Product) => this.productForm.patchValue(response)
    )

  }

  initPage(): void {
    this.catService.getCats().subscribe(
      data => this.categories = data
    );
  }

  onSubmit():any{
    const product: Product = this.productForm.value as Product;
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.updateProduct(product, id).subscribe(
      data => this.productService.updateProducts(data)
    );
    this.router.navigate(['/product-list']);
  }

}
