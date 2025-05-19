import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CartItemCardComponent } from './cart-item-card/cart-item-card.component';
import { Product } from '../../shared/types/product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ManagementService } from '../../services/management/management.service';

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
  products: Product[] = [];
  isEmpty = false;

  constructor(public managementService: ManagementService) {}

  async ngOnInit(): Promise<void> {
    await this.getCartItems();
  }

  async ngOnChanges(): Promise<void> {
    await this.getCartItems();
  }

  private async getCartItems(): Promise<void> {
    try {
      this.products = await this.managementService.loadProducts();
      //this.totalPriceCalculation();
      if (this.products.length > 0) {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  }

  clearCart() {
    this.managementService.clearCart();
    this.products = [];
    /*this.totalPrice = 0;
    this.isCartEmpty = true;*/
  }
}
