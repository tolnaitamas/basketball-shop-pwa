import { Component, Input } from '@angular/core';
import { Product } from '../../shared/types/product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-item-card',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.scss',
})
export class CartItemCardComponent {
  @Input() product!: Product;
}
