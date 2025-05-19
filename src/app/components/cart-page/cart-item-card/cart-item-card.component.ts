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

  constructor(private managementService: ManagementService) {}

  ngOnInit() {
    this.prize = this.product.price;
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
