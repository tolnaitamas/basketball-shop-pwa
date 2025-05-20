import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CartItemCardComponent } from './cart-item-card/cart-item-card.component';
import { Product } from '../../shared/types/product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ManagementService } from '../../services/management/management.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  standalone: true,
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
  totalPrice = 0;

  private subscription!: Subscription;

  constructor(public managementService: ManagementService) {}

  ngOnInit(): void {
    this.subscription = this.managementService.products$.subscribe(
      (products) => {
        this.products = products;
        this.isEmpty = products.length === 0;
        this.calculateTotalPrice();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  clearCart(): void {
    this.managementService.clearCart();
    this.products = [];
    this.totalPrice = 0;
  }

  private calculateTotalPrice(): void {
    this.totalPrice = this.products.reduce((sum, product) => {
      const price = product.price || 0;
      return sum + price;
    }, 0);
  }
}
