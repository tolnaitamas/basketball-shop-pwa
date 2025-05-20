import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductQuantityService {
  private allProductQuantity = new BehaviorSubject<number>(0);
  allProductQuantity$ = this.allProductQuantity.asObservable();

  setQuantity(amount: number): void {
    this.allProductQuantity.next(amount);
  }

  getQuantity(): number {
    return this.allProductQuantity.getValue();
  }
}
