import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CartItemCardComponent } from './cart-item-card/cart-item-card.component';
import { OrderProduct, Product } from '../../shared/types/product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ManagementService } from '../../services/management/management.service';
import { Subscription, take } from 'rxjs';
import { OrderFirebaseService } from '../../services/firebase/order/order-firebase.service';
import { Order } from '../../shared/types/order';
import { UserFirebaseService } from '../../services/firebase/user/user-firebase.service';
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    FooterComponent,
    CartItemCardComponent,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  products: Product[] = [];
  isEmpty = false;
  totalPrice = 0;

  private subscription!: Subscription;

  constructor(
    public managementService: ManagementService,
    private orderService: OrderFirebaseService,
    private userService: UserFirebaseService
  ) {}

  ngOnInit(): void {
    this.subscription = this.managementService.products$.subscribe(
      (products) => {
        this.products = products;
        this.isEmpty = products.length === 0;
        this.calculateTotalPrice();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  clearCart(): void {
    this.managementService.clearCart();
    this.products = [];
    this.totalPrice = 0;
  }

  private calculateTotalPrice(): void {
    this.totalPrice = this.products.reduce((sum, product) => {
      const price = product.price || 0;
      return sum + price;
    }, 0);
  }

  toOrderProducts(products: Product[]): OrderProduct[] {
    return products.map((product) => {
      const {
        id,
        sex,
        brand,
        name,
        imageUrl,
        category,
        price,
        selectedSize,
        quantity,
      } = product;
      return {
        id,
        sex,
        brand,
        name,
        imageUrl,
        category,
        price,
        selectedSize,
        quantity,
      };
    });
  }

  async sendOrder(): Promise<void> {
    const user = await this.userService
      .getUserProfile()
      .pipe(take(1))
      .toPromise();

    if (user) {
      const order: Order = {
        customer: {
          email: user.email,
          name: user.name,
          phone: user.phone,
        },
        items: this.toOrderProducts(this.products),
        price: this.totalPrice,
        shipping: {
          country: user.country,
          zip: user.zip,
          city: user.city,
          address: user.address,
        },
      };

      await this.orderService.createOrder(order);
      alert('Rendelés sikeresen leadva!');
      this.clearCart();
    } else {
      alert('Nem található felhasználói profil.');
    }
  }
}
