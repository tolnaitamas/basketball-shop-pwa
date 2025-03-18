import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { LoginRegistrationPageComponent } from './login-registration-page/login-registration-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminPageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'login-registration',
    component: LoginRegistrationPageComponent,
  },
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: 'product',
    component: ProductPageComponent,
  },
  {
    path: 'products',
    component: ProductsPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
