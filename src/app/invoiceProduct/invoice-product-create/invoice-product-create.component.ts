import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceProduct } from 'src/app/common/invoice-product';
import { Product } from 'src/app/common/product';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProductService } from 'src/app/services/product.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-invoice-product-create',
  templateUrl: './invoice-product-create.component.html',
  styleUrls: ['./invoice-product-create.component.css']
})
export class InvoiceProductCreateComponent implements OnInit {
  faTrashCan = faTrashCan;
  products: Product[] = [];
  invProducts: InvoiceProduct[] = [];
  iProductForm!: FormGroup;
  @Output() iProductsEmitter = new EventEmitter<InvoiceProduct[]>();

  constructor(private productService: ProductService,
              private invoiceService: InvoiceService,
              private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.productService.fetchProducts();
    this.productService.getProducts().subscribe(
      data => this.products = data
    );

    this.iProductForm = this.formBuilder.group({
      quantity: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      tax: new FormControl('',[Validators.required]),
      product: new FormControl('',[Validators.required]),
    });

  }

  onSubmit(){
    const product: InvoiceProduct = this.iProductForm.value as InvoiceProduct;
    product.total = (product.price * product.quantity) + (product.price * product.quantity * product.tax / 100);
    this.invProducts.push(product);
    this.iProductForm.reset();
    this.iProductsEmitter.emit(this.invProducts);
  }

  deleteInvProduct(iproduct: InvoiceProduct){
    this.invProducts = this.invProducts.filter(h => h !== iproduct);
    this.iProductsEmitter.emit(this.invProducts);
  }

}
