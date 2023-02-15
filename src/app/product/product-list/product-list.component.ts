import { Component, OnInit } from '@angular/core';
import { faCirclePlus, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  faPlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faPen = faPen;
  products: Product[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.fetchProducts();
    this.productService.getProducts().subscribe(
      data => this.products = data
    )
  }

  deleteProduct(product: Product): void{
    this.products = this.products.filter(h => h !== product);
    this.productService.deleteProduct(product.id!).subscribe();
  }

}
