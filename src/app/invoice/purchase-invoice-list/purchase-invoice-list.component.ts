import { Component, OnInit } from '@angular/core';
import { faCirclePlus, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { Invoice } from 'src/app/common/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-purchase-invoice-list',
  templateUrl: './purchase-invoice-list.component.html',
  styleUrls: ['./purchase-invoice-list.component.css']
})
export class PurchaseInvoiceListComponent implements OnInit{
  faPlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faPen = faPen;
  invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService){}

  ngOnInit(): void {
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
}
