import { Component, OnInit } from '@angular/core';
import { faCirclePlus, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { ClientVendor } from 'src/app/common/client-vendor';
import { ClientVendorService } from 'src/app/services/client-vendor.service';

@Component({
  selector: 'app-client-vendor-list',
  templateUrl: './client-vendor-list.component.html',
  styleUrls: ['./client-vendor-list.component.css']
})
export class ClientVendorListComponent implements OnInit {
  faPlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faPen = faPen;
  clientVendors: ClientVendor[] = []; 
  error!: string;

  constructor(private clientVendService: ClientVendorService){}

  ngOnInit(): void {
    this.clientVendService.fetchClientVendors();
    this.clientVendService.getClientVendors().subscribe(
      data => this.clientVendors = data
    )
  }

  deleteClient(clientVendor: ClientVendor): void{
    this.clientVendService.deleteClientVendor(clientVendor.id!).subscribe(
      (res: any) => this.clientVendService.fetchClientVendors(),
      (err: any) => this.error = err
    );
  }

}
