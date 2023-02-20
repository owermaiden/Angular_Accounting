import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, RouterEvent, Router} from '@angular/router';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { faCirclePlus, faTrashCan, faPen, faCheck, faCircleCheck, faPrint } from '@fortawesome/free-solid-svg-icons';
import { filter, Subscription } from 'rxjs';
import { Invoice } from 'src/app/common/invoice';
import { CategoryService } from 'src/app/services/category.service';
import { ClientVendorService } from 'src/app/services/client-vendor.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-purchase-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, OnDestroy{
  faCheck = faCircleCheck;
  faCheckSimple = faCheck;
  faTrashCan = faTrashCan;
  faPen = faPen;
  faPrint = faPrint;
  faPlus = faCirclePlus;
  invoices: Invoice[] = [];
  type: string = '';
  private _routerSub = Subscription.EMPTY;

  constructor(private invoiceService: InvoiceService,
              private categoryService: CategoryService,
              private clientService: ClientVendorService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router)
  {
    this._routerSub = router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
    if ((e instanceof NavigationEnd && e.url === '/pinvoice-list/SALE') || (e instanceof NavigationEnd && e.url === '/pinvoice-list/PURCHASE')){
      this.initPage();
    }
    });
  }

  ngOnInit(): void {
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
    this.invoiceService.approveInvoice(invoice.id!).subscribe(
      () => this.invoiceService.fetchInvoices(this.type)
    )
  }

  printInvoice(invoice: Invoice){
    console.log('Convert to pdf');
  }

  ngOnDestroy(){
    this._routerSub.unsubscribe();
  }
}
