import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../types/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  constructor(private router: Router) {}

  @Input() product!: Product;

  addToCart(): void {
    console.log(
      `A ${this.product.name} termék hozzáadva a kosárhoz, méret: ${this.product.selectedSize}`
    );
  }

  goToProduct(product: Product): void {
    this.router.navigate(['/product'], { state: { product } });
  }
}
