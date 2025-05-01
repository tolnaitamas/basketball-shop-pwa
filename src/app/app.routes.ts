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
    path: 'work-with-us',
    loadComponent: () =>
      import('./work-with-us-page/work-with-us-page.component').then(
        (c) => c.WorkWithUsPageComponent
      ),
  },
  {
    path: 'our-stores',
    loadComponent: () =>
      import('./our-stores-page/our-stores-page.component').then(
        (c) => c.OurStoresPageComponent
      ),
  },
  {
    path: 'return',
    loadComponent: () =>
      import('./return-page/return-page.component').then(
        (c) => c.ReturnPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
