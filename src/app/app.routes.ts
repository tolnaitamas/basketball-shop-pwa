import { Routes } from '@angular/router';
import { loginGuard } from './shared/login-guard/login.guard';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () =>
      import('./components/main-page/main-page.component').then(
        (c) => c.MainPageComponent
      ),
  },
  {
    path: 'product',
    loadComponent: () =>
      import('./components/product-page/product-page.component').then(
        (c) => c.ProductPageComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/products-page/products-page.component').then(
        (c) => c.ProductsPageComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile-page/profile-page.component').then(
        (c) => c.ProfilePageComponent
      ),
    canActivate: [loginGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login-page/login-page.component').then(
        (c) => c.LoginPageComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register-page/register-page.component').then(
        (c) => c.RegisterPageComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart-page/cart-page.component').then(
        (c) => c.CartPageComponent
      ),
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./components/order-page/order-page.component').then(
        (c) => c.OrderPageComponent
      ),
  },
  {
    path: 'our-stores',
    loadComponent: () =>
      import('./components/our-stores-page/our-stores-page.component').then(
        (c) => c.OurStoresPageComponent
      ),
  },
  {
    path: 'return',
    loadComponent: () =>
      import('./components/return-page/return-page.component').then(
        (c) => c.ReturnPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
