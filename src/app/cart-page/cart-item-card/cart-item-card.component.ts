import { Component, Input } from '@angular/core';
import { Product } from '../../shared/types/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item-card',
  imports: [CommonModule],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.scss',
})
export class CartItemCardComponent {
  @Input() product!: Product;
}
