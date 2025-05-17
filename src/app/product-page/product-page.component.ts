import { Component } from '@angular/core';
import { Product } from '../shared/types/product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../shared/product-card/product-card.component';

@Component({
  selector: 'app-product-page',
  imports: [
    CommonModule,
    MatListModule,
    FooterComponent,
    MatButtonModule,
    ProductCardComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  product: Product;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['product'];
  }

  inStock = true;

  ngOnInit(): void {
    const state = history.state;
    if (state && state.product) {
      this.product = state.product;
    } else {
      // fallback logic (e.g. fetch from API based on ID param)
    }
  }

  selectSize(size: number) {
    this.product.selectedSize = size;
  }

  addToCart() {
    console.log('Kosárba:', this.product);
    // implement real cart logic here
  }

  products: Product[] = [
    {
      id: 1,
      sex: 'Férfi',
      brand: 'Jordan',
      name: 'Air Jordan 1 Low White/Metallic Gold-Black',
      imageUrl: 'main-page/asd.webp',
      category: 'clothes',
      price: 53999,
      sizes: [40, 41, 45, 45.5],
      selectedSize: 40,
    },
    {
      id: 2,
      sex: 'Férfi',
      brand: 'Nike',
      name: 'Nike Air Max 97 Silver Bullet',
      imageUrl: 'main-page/asd.webp',
      category: 'shoes',
      price: 74999,
      sizes: [42, 43, 44],
      selectedSize: 42,
    },
    {
      id: 3,
      sex: 'Női',
      brand: 'Adidas',
      name: 'Adidas UltraBoost 21',
      imageUrl: 'main-page/asd.webp',
      category: 'caps',
      price: 86999,
      sizes: [40, 41, 42, 43],
      selectedSize: 41,
    },
    {
      id: 4,
      sex: 'Férfi',
      brand: 'Puma',
      name: 'Puma RS-X3',
      imageUrl: 'main-page/asd.webp',
      category: 'other',
      price: 59999,
      sizes: [43, 44, 45],
      selectedSize: 44,
    },
  ];
}
