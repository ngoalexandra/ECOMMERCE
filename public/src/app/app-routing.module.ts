import { AdmindashComponent } from './admindash/admindash.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: '/main'},
  {path: 'main', component: MainComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'admindash', component: AdmindashComponent},
  {path: 'add', component: AddProductComponent},
  {path: 'edit/:id', component: EditProductComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'users', component: UsersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
