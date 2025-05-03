import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../types/Product';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;

  addToCart(): void {
    console.log(
      `A ${this.product.name} termék hozzáadva a kosárhoz, méret: ${this.product.selectedSize}`
    );
  }
}
