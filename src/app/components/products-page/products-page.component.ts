import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { Product } from '../../shared/types/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFirebaseService } from '../../services/firebase/product/product-firebase.service';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-products-page',
  imports: [
    FooterComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ProductCardComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {
  filteredProducts: Product[] = [];

  products: Product[] = [];

  filters = {
    sex: '',
    brand: '',
    sizes: [] as number[],
    price: null as number | null,
    sortBy: '',
  };

  sizes = Array.from({ length: 11 }, (_, i) => 35 + i);
  brands = ['Adidas', 'Nike', 'Jordan', 'Puma'];

  constructor(private productsService: ProductFirebaseService) {}

  ngOnInit(): void {
    const cached = this.productsService.getProductsSnapshot();
    if (cached) {
      this.products = cached;
    } else {
      this.productsService.products$
        .pipe(
          filter((p) => !!p),
          take(1)
        )
        .subscribe((p) => (this.products = p));
    }
  }

  applyFilters() {
    const filteredProducts = this.products.filter((product) => {
      const matchesSex = !this.filters.sex || product.sex === this.filters.sex;
      const matchesBrand =
        !this.filters.brand || product.brand === this.filters.brand;
      const matchesSize =
        !this.filters.sizes.length ||
        this.filters.sizes.some((s) => product.sizes.includes(s));
      const matchesPrice =
        !this.filters.price || product.price <= this.filters.price;

      return matchesSex && matchesBrand && matchesSize && matchesPrice;
    });

    switch (this.filters.sortBy) {
      case 'nameAsc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceAsc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }

    console.log(filteredProducts);
  }
}
