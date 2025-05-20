import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { Router } from '@angular/router';
import { Product } from '../../shared/types/product';
import { ProductFirebaseService } from '../../services/firebase/product/product-firebase.service';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, FooterComponent, ProductCardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  constructor(
    private router: Router,
    private productsService: ProductFirebaseService
  ) {}
  images = ['/main-page/slider1.webp', '/main-page/slider2.webp'];

  products: Product[] = [];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);

    this.productsService.getProductsCollection().subscribe(
      (data) => {
        this.productsService.setProducts(data);
        this.products = data;
        console.log('Termékek:', this.products);
      },
      (error) => {
        console.error('Hiba a termékek betöltésekor:', error);
      }
    );
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
