import { Component } from '@angular/core';
import { Product } from '../../shared/types/product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ProductFirebaseService } from '../../services/firebase/product/product-firebase.service';
import { ManagementService } from '../../services/management/management.service';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-product-page',
  imports: [
    CommonModule,
    MatListModule,
    FooterComponent,
    MatButtonModule,
    ProductCardComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  product: Product;

  constructor(
    private router: Router,
    private productsService: ProductFirebaseService,
    private managementService: ManagementService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['product'];
  }

  inStock = true;

  products: Product[] = [];

  ngOnInit(): void {
    const state = history.state;
    if (state && state.product) {
      this.product = state.product;

      const cached = this.productsService.getProductsSnapshot();
      if (cached) {
        this.products = cached;
      } else {
        this.productsService.products$
          .pipe(
            filter((p) => !!p), // csak ha nem null vagy undefined
            take(1)
          )
          .subscribe((p) => (this.products = p));
      }
    }
  }

  selectSize(size: number) {
    this.product.selectedSize = size;
  }

  addToCart() {
    console.log('Kosárba:', this.product);
    this.managementService.createProduct(this.product);
  }
}
