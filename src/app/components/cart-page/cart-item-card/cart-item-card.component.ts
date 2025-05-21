import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/types/product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ManagementService } from '../../../services/management/management.service';
import { ProductFirebaseService } from '../../../services/firebase/product/product-firebase.service';

@Component({
  selector: 'app-cart-item-card',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.scss',
})
export class CartItemCardComponent {
  @Input() product!: Product;

  prize: number = 0;
  isRemoved = false;
  products: Product[] = [];

  constructor(
    private managementService: ManagementService,
    private productsService: ProductFirebaseService
  ) {}

  async ngOnInit() {
    const cached = this.productsService.getProductsSnapshot();
    if (cached) {
      this.products = cached;

      const matchingProduct = this.products.find(
        (p) => p.id === this.product.id
      );

      if (matchingProduct) {
        this.prize = matchingProduct.price;
        this.product.price = this.prize * this.product.quantity;
      } else {
        console.warn(
          `Termék nem található a cache-ben ID alapján: ${this.product.id}`
        );
      }
    } else {
      console.warn('Nincsenek lekérve a termékek.');
    }
  }

  async updateQuantity(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.managementService.updateProductQuantity(
      this.product.id,
      Number(value)
    );
    this.managementService.updateProductQuantityPrice(
      this.product.id,
      Number(value) * this.prize
    );

    this.product = await this.managementService.getProduct(this.product.id);
  }

  async removeItem() {
    this.managementService.removeProduct(this.product.id);
    this.isRemoved = true;
  }
}
