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
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceCreateComponent } from './invoice/invoice-create/invoice-create.component';
import { InvoiceUpdateComponent } from './invoice/invoice-update/invoice-update.component';
import { InvoiceProductCreateComponent } from './invoiceProduct/invoice-product-create/invoice-product-create.component';
import { StockReportComponent } from './report/stock-report/stock-report.component';
import { ProfitLossComponent } from './report/profit-loss/profit-loss.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

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
    InvoiceListComponent,
    InvoiceCreateComponent,
    InvoiceUpdateComponent,
    InvoiceProductCreateComponent,
    StockReportComponent,
    ProfitLossComponent,
    DashboardComponent
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
