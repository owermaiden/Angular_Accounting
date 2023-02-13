import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserlistComponent } from './user/userlist/userlist.component';

const routes: Routes = [
  { path: 'userlist', component: UserlistComponent },
  { path: 'user-detail/:id', component: UserCreateComponent },
  { path: 'user-detail', component: UserCreateComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
