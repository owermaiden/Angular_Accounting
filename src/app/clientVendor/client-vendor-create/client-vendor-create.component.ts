import { Component, OnInit } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/common/company';
import { ClientVendor } from 'src/app/common/client-vendor';
import { ClientVendorService } from 'src/app/services/client-vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-vendor-create',
  templateUrl: './client-vendor-create.component.html',
  styleUrls: ['./client-vendor-create.component.css']
})
export class ClientVendorCreateComponent implements OnInit{
  faList = faList;
  clientVendorForm!: FormGroup;
  error!: string

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientVendorService,
              private router: Router){}

  ngOnInit(): void {
    this.clientVendorForm = this.formBuilder.group({
      clientVendorName: new FormControl('',[Validators.required,Validators.maxLength(20)]),
      phone:  new FormControl('',[Validators.required]),
      website: new FormControl('',[Validators.required]),
      clientVendorType: new FormControl('',[Validators.required]),
      address: new FormGroup({
        addressLine1: new FormControl('', [Validators.required]),
        addressLine2: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        zipCode: new FormControl('', [Validators.required])
      })
    });
  }

  onSubmit(): void {
    const client: ClientVendor = this.clientVendorForm.value as ClientVendor;
    console.log(client);
    this.clientService.createClientVendor(client).subscribe(
      ((value: ClientVendor) => {
        this.clientService.setClientVendors(value);
        this.router.navigate(['/client-list']);
      }),
      ((err: any) => this.error = err )
    );
  }
}
