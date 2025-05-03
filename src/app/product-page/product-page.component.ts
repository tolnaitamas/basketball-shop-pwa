import { Component } from '@angular/core';
import { Product } from '../shared/types/product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, MatListModule, FooterComponent, MatButtonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  product: Product;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['product'];
  }

  inStock = true;

  ngOnInit(): void {
    const state = history.state;
    if (state && state.product) {
      this.product = state.product;
    } else {
      // fallback logic (e.g. fetch from API based on ID param)
    }
  }

  selectSize(size: number) {
    this.product.selectedSize = size;
  }

  addToCart() {
    console.log('Kosárba:', this.product);
    // implement real cart logic here
  }
}
