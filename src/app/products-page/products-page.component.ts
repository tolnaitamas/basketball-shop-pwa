import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { Product } from '../shared/types/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  filteredProducts: Product[] = []; // Szűrt terméklista

  filters = {
    sex: '',
    brand: '',
    sizes: [] as number[],
    price: null as number | null,
    sortBy: '',
  };

  sizes = Array.from({ length: 11 }, (_, i) => 35 + i); // 35-45
  brands = ['Adidas', 'Nike', 'Jordan', 'Puma'];

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

  products: Product[] = [
    {
      id: 1,
      sex: 'Férfi',
      brand: 'Jordan',
      name: 'Air Jordan 1 Low White/Metallic Gold-Black',
      imageUrl: 'main-page/asd.webp',
      category: 'clothes',
      price: 53999,
      sizes: [40, 41, 45, 45.5],
      selectedSize: 40,
    },
    {
      id: 2,
      sex: 'Férfi',
      brand: 'Nike',
      name: 'Nike Air Max 97 Silver Bullet',
      imageUrl: 'main-page/asd.webp',
      category: 'shoes',
      price: 74999,
      sizes: [42, 43, 44],
      selectedSize: 42,
    },
    {
      id: 3,
      sex: 'Női',
      brand: 'Adidas',
      name: 'Adidas UltraBoost 21',
      imageUrl: 'main-page/asd.webp',
      category: 'caps',
      price: 86999,
      sizes: [40, 41, 42, 43],
      selectedSize: 41,
    },
    {
      id: 4,
      sex: 'Férfi',
      brand: 'Puma',
      name: 'Puma RS-X3',
      imageUrl: 'main-page/asd.webp',
      category: 'other',
      price: 59999,
      sizes: [43, 44, 45],
      selectedSize: 44,
    },
    {
      id: 5,
      sex: 'Férfi',
      brand: 'Jordan',
      name: 'Air Jordan 1 Low White/Metallic Gold-Black',
      imageUrl: 'main-page/asd.webp',
      category: 'clothes',
      price: 53999,
      sizes: [40, 41, 45, 45.5],
      selectedSize: 40,
    },
    {
      id: 6,
      sex: 'Férfi',
      brand: 'Nike',
      name: 'Nike Air Max 97 Silver Bullet',
      imageUrl: 'main-page/asd.webp',
      category: 'shoes',
      price: 74999,
      sizes: [42, 43, 44],
      selectedSize: 42,
    },
    {
      id: 7,
      sex: 'Női',
      brand: 'Adidas',
      name: 'Adidas UltraBoost 21',
      imageUrl: 'main-page/asd.webp',
      category: 'caps',
      price: 86999,
      sizes: [40, 41, 42, 43],
      selectedSize: 41,
    },
    {
      id: 8,
      sex: 'Férfi',
      brand: 'Puma',
      name: 'Puma RS-X3',
      imageUrl: 'main-page/asd.webp',
      category: 'other',
      price: 59999,
      sizes: [43, 44, 45],
      selectedSize: 44,
    },
  ];
}
