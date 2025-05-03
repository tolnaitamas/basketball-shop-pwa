import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { Router } from '@angular/router';
import { Product } from '../shared/types/product';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, FooterComponent, ProductCardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  constructor(private router: Router) {}
  images = ['/main-page/slider1.webp', '/main-page/slider2.webp'];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); // 3 másodpercenként
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  products: Product[] = [
    {
      name: 'Air Jordan 1 Low White/Metallic Gold-Black',
      imageUrl: 'main-page/asd.webp',
      price: 53999,
      sizes: [40, 41, 45, 45.5],
      selectedSize: 40,
    },
    {
      name: 'Nike Air Max 97 Silver Bullet',
      imageUrl: 'main-page/asd.webp',
      price: 74999,
      sizes: [42, 43, 44],
      selectedSize: 42,
    },
    {
      name: 'Adidas UltraBoost 21',
      imageUrl: 'main-page/asd.webp',
      price: 86999,
      sizes: [40, 41, 42, 43],
      selectedSize: 41,
    },
    {
      name: 'Puma RS-X3',
      imageUrl: 'main-page/asd.webp',
      price: 59999,
      sizes: [43, 44, 45],
      selectedSize: 44,
    },
  ];
}
