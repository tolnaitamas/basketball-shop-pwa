import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CartItemCardComponent } from './cart-item-card/cart-item-card.component';
import { Product } from '../../shared/types/product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-page',
  imports: [
    FooterComponent,
    CartItemCardComponent,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
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
      quantity: 1,
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
      quantity: 1,
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
      quantity: 1,
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
      quantity: 1,
    },
  ];
}
