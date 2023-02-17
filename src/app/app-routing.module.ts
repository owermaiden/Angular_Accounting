import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { ClientVendorCreateComponent } from './clientVendor/client-vendor-create/client-vendor-create.component';
import { ClientVendorListComponent } from './clientVendor/client-vendor-list/client-vendor-list.component';
import { ClientVendorUpdateComponent } from './clientVendor/client-vendor-update/client-vendor-update.component';
import { PurchaseInvoiceCreateComponent } from './invoice/invoice-create/invoice-create.component';
import { PurchaseInvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { PurchaseInvoiceUpdateComponent } from './invoice/invoice-update/invoice-update.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserlistComponent } from './user/userlist/userlist.component';

const routes: Routes = [
  { path: 'userlist', component: UserlistComponent },
  { path: 'user-update/:id', component: UserUpdateComponent },
  { path: 'user-detail', component: UserCreateComponent },
  { path: 'category-list', component: CategoryListComponent},
  { path: 'category-detail/:id', component: CategoryUpdateComponent},
  { path: 'category-detail', component: CategoryCreateComponent},
  { path: 'client-list', component: ClientVendorListComponent},
  { path: 'client-detail/:id', component: ClientVendorUpdateComponent},
  { path: 'client-detail', component: ClientVendorCreateComponent},
  { path: 'product-list', component: ProductListComponent},
  { path: 'product-detail/:id', component: ProductUpdateComponent},
  { path: 'product-detail', component: ProductCreateComponent},
  { path: 'pinvoice-list/:type', component: PurchaseInvoiceListComponent},
  { path: 'pinvoice-detail/:type', component: PurchaseInvoiceCreateComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
