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

  updateQuantity(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.product.quantity = Number(value);
    // Esetleg értesíthetjük a szülő komponenst a változásról
  }

  removeItem() {
    // Logika a tétel eltávolításához, pl. EventEmitter használata
    console.log('Tétel eltávolítva:', this.product);
  }
}
