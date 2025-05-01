import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () =>
      import('./main-page/main-page.component').then(
        (c) => c.MainPageComponent
      ),
  },
  {
    path: 'product',
    loadComponent: () =>
      import('./product-page/product-page.component').then(
        (c) => c.ProductPageComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products-page/products-page.component').then(
        (c) => c.ProductsPageComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile-page/profile-page.component').then(
        (c) => c.ProfilePageComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart-page/cart-page.component').then(
        (c) => c.CartPageComponent
      ),
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./order-page/order-page.component').then(
        (c) => c.OrderPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
