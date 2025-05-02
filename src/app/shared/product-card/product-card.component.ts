import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  name: string = 'Air Jordan 1 Low White/Metallic Gold-Black';
  imageUrl: string = 'main-page/asd.webp'; // Cseréld ki a megfelelő képre
  price: number = 53999;
  sizes: number[] = [40, 41, 45, 45.5];
  selectedSize: number = this.sizes[0];

  @Input() shoe!: {
    name: string;
    price: number;
    sizes: number[];
    imageUrl: string;
  };

  addToCart() {
    console.log(`Kosárba helyezve: ${this.name} - Méret: ${this.selectedSize}`);
  }
}
