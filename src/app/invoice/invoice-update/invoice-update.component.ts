import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientVendor } from 'src/app/common/client-vendor';
import { Invoice } from 'src/app/common/invoice';
import { InvoiceProduct } from 'src/app/common/invoice-product';
import { ClientVendorService } from 'src/app/services/client-vendor.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-purchase-invoice-update',
  templateUrl: './invoice-update.component.html',
  styleUrls: ['./invoice-update.component.css']
})
export class InvoiceUpdateComponent implements OnInit{
  type: string = '';
  invoiceForm!: FormGroup;
  id: number | undefined;
  clientVendors: ClientVendor[] = [];
  invProducts: InvoiceProduct[] = [];

  constructor(private invoiceService: InvoiceService,
              private formBuilder: FormBuilder,
              private clientService: ClientVendorService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.invoiceForm = this.formBuilder.group({
      invoiceNo: new FormControl('',[Validators.required,Validators.minLength(2)]),
      date: new FormControl('',[Validators.required]),
      clientVendor: new FormControl('',[Validators.required])
    });

    this.clientService.fetchClientVendors();
    this.clientService.getClientVendors().subscribe(
      response => this.clientVendors = response
    );

    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.route.paramMap.subscribe(() => { 
      this.getInvoiceById(this.id!);
      this.invoiceService.getInvoiceProducts(this.id!).subscribe(
        response => {
          this.invProducts = response;
        }
      );
     });
  }

  getInvoiceById(id: number){
      this.invoiceService.getInvoiceById(id).subscribe(
        (response: Invoice) => {
          this.invoiceForm.patchValue(response);
          this.type = response.invoiceType!;
        } 
      )
  }


  onSubmit(){
    const invoice: Invoice = this.invoiceForm.value as Invoice;
    invoice.invoiceProducts = [];
    this.invProducts.forEach(
      iProduct => {
        if(!iProduct.id){
          this.invoiceService.createInvoiceProducts(this.id!, iProduct).subscribe(
            data => invoice.invoiceProducts?.push(data)
          )
        }
      }
    );
    this.invoiceService.updateInvoice(invoice, this.id!).subscribe(
      data => this.invoiceService.updateInvoices(data)
    );
    this.router.navigate(['/pinvoice-list', this.type]);
  }

  addInvoiceProduct(iProducts: InvoiceProduct[]){
    this.invProducts = iProducts;
  }

}
