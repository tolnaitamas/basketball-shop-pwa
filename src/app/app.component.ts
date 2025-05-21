import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ProductQuantityService } from './services/cart/product-quantity.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatSelectModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'DunkShop Budapest';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private router: Router,
    public productQuantityService: ProductQuantityService
  ) {}

  sidenavOpened = false;

  navigateTo(route: string): void {
    this.router.navigate([route]).then(() => {
      this.sidenav.close();
    });
  }
}
