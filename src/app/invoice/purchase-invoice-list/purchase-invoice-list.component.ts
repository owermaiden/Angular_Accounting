import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faCirclePlus, faTrashCan, faPen, faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
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
  faCheckSimple = faCheck;
  faTrashCan = faTrashCan;
  faPen = faPen;
  faPlus = faCirclePlus;
  invoices: Invoice[] = [];
  type: string = '';

  constructor(private invoiceService: InvoiceService,
              private categoryService: CategoryService,
              private clientService: ClientVendorService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.initPage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initPage();
      }
    });
  }

  initPage(){
    this.type = this.route.snapshot.paramMap.get('type')!;
    this.categoryService.fetchCtegories();
    this.clientService.fetchClientVendors();
    this.productService.fetchProducts();
    this.invoiceService.fetchInvoices(this.type);
    this.invoiceService.getInvoices(this.type).subscribe(
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
    console.log(invoice);
    this.invoiceService.approveInvoice(invoice.id!).subscribe(
      () => this.invoiceService.fetchInvoices(this.type)
    )
  }
}
