import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserlistComponent } from './user/userlist/userlist.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { ClientVendorListComponent } from './clientVendor/client-vendor-list/client-vendor-list.component';
import { ClientVendorCreateComponent } from './clientVendor/client-vendor-create/client-vendor-create.component';
import { ClientVendorUpdateComponent } from './clientVendor/client-vendor-update/client-vendor-update.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { PurchaseInvoiceListComponent } from './invoice/purchase-invoice-list/purchase-invoice-list.component';
import { PurchaseInvoiceCreateComponent } from './invoice/purchase-invoice-create/purchase-invoice-create.component';
import { PurchaseInvoiceUpdateComponent } from './invoice/purchase-invoice-update/purchase-invoice-update.component';
import { InvoiceProductCreateComponent } from './invoiceProduct/invoice-product-create/invoice-product-create.component';

@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    UserCreateComponent,
    UserUpdateComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryUpdateComponent,
    ClientVendorListComponent,
    ClientVendorCreateComponent,
    ClientVendorUpdateComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    PurchaseInvoiceListComponent,
    PurchaseInvoiceCreateComponent,
    PurchaseInvoiceUpdateComponent,
    InvoiceProductCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
