import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserlistComponent } from './user/userlist/userlist.component';

const routes: Routes = [
  { path: 'userlist', component: UserlistComponent },
  { path: 'user-update/:id', component: UserUpdateComponent },
  { path: 'user-detail', component: UserCreateComponent },
  { path: 'category-list', component: CategoryListComponent},
  { path: 'category-detail/:id', component: CategoryUpdateComponent},
  { path: 'category-detail', component: CategoryCreateComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
