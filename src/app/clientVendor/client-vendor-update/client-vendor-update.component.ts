import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { ClientVendor } from 'src/app/common/client-vendor';
import { ClientVendorService } from 'src/app/services/client-vendor.service';

@Component({
  selector: 'app-client-vendor-update',
  templateUrl: './client-vendor-update.component.html',
  styleUrls: ['./client-vendor-update.component.css']
})
export class ClientVendorUpdateComponent implements OnInit{
  faList = faList;
  clientVendorForm!: FormGroup;

  constructor(private clientService: ClientVendorService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute){}

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
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.route.paramMap.subscribe(() => { this.getClientById(id); });
  }

  getClientById(id: number) {
    this.clientService.getClientVendorById(id).subscribe(
      (response: ClientVendor) => this.clientVendorForm.patchValue(response)
    )
  }

  onSubmit():any{
    const client: ClientVendor = this.clientVendorForm.value as ClientVendor;
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.clientService.updateClientVendor(client, id).subscribe(
      data => this.clientService.updateClientVendors(data)
    );
    this.router.navigate(['/client-list']);
  }
}
