import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientVendor } from 'src/app/common/client-vendor';
import { Invoice } from 'src/app/common/invoice';
import { ClientVendorService } from 'src/app/services/client-vendor.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-purchase-invoice-create',
  templateUrl: './purchase-invoice-create.component.html',
  styleUrls: ['./purchase-invoice-create.component.css']
})
export class PurchaseInvoiceCreateComponent implements OnInit{
  invoiceForm!: FormGroup;
  clientVendors: ClientVendor[] = [];

  constructor(private invoiceService: InvoiceService,
              private formBuilder: FormBuilder,
              private clientService: ClientVendorService){}

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

    this.invoiceService.createInvoice(new Invoice(), 'PURCHASE').subscribe(
      response =>  this.invoiceForm.patchValue(response)
    )
  }

  onSubmit(){

  }

}
