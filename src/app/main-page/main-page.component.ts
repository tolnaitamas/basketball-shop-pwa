import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { ProductCardComponent } from '../shared/product-card/product-card.component';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, FooterComponent, ProductCardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
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
}
