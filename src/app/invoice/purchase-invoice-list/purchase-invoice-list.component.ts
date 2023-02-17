import { Component, OnInit } from '@angular/core';
import { faCirclePlus, faTrashCan, faPen, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Invoice } from 'src/app/common/invoice';
import { CategoryService } from 'src/app/services/category.service';
import { ClientVendorService } from 'src/app/services/client-vendor.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-purchase-invoice-list',
  templateUrl: './purchase-invoice-list.component.html',
  styleUrls: ['./purchase-invoice-list.component.css']
})
export class PurchaseInvoiceListComponent implements OnInit{
  faCheck = faCircleCheck;
  faTrashCan = faTrashCan;
  faPen = faPen;
  faPlus = faCirclePlus;
  invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService,
              private categoryService: CategoryService,
              private clientService: ClientVendorService,
              private productService: ProductService ){}

  ngOnInit(): void {
    this.categoryService.fetchCtegories();
    this.clientService.fetchClientVendors();
    this.productService.fetchProducts();
    this.invoiceService.fetchInvoices('PURCHASE');
    this.invoiceService.getInvoices('PURCHASE').subscribe(
      data => this.invoices = data
    )
  }

  deleteInv(invoice: Invoice): void{
    this.invoiceService.deleteInvoice(invoice.id!).subscribe(
      () => {
        this.invoices = this.invoices.filter(h => h !== invoice);
      }
    );
  }
  approveInvoice(invoice: Invoice){
    this.invoiceService.approveInvoice(invoice.id!).subscribe(
      data => console.log(data)
    )
  }
}
