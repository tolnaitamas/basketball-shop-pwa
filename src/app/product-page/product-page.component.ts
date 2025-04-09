import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../shared/product';
import { ManagementService } from '../shared/management.service';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  public product1: Product;
  public product2: Product;
  public product3: Product;

  constructor(private readonly managementService: ManagementService) {
    this.product1 = {
      name: 'Fekete póló',
      cost: 4990,
      size: 'L',
    };
    this.product2 = {
      name: 'Piros zokni',
      cost: 599,
      size: '42-46',
    };
    this.product3 = {
      name: 'Baseball sapka',
      cost: 1499,
      size: 'one',
    };
  }

  public buyProduct1(): void {
    this.managementService.createBuilding(this.product1);
  }
  public buyProduct2(): void {
    this.managementService.createBuilding(this.product2);
  }
  public buyProduct3(): void {
    this.managementService.createBuilding(this.product3);
  }
}
