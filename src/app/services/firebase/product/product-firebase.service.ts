import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../../shared/types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductFirebaseService {
  private productsSubject = new BehaviorSubject<Product[] | null>(null);
  products$ = this.productsSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadProducts();
  }

  setProducts(products: Product[]) {
    this.productsSubject.next(products);
  }

  getProductsSnapshot(): Product[] | null {
    return this.productsSubject.value;
  }

  private loadProducts(): void {
    const productsRef = collection(
      this.firestore,
      'product'
    ) as CollectionReference<Product>;
    collectionData<Product>(productsRef, { idField: 'id' }).subscribe(
      (products) => {
        this.productsSubject.next(products);
      }
    );
  }

  getProductsCollection(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'product');
    return collectionData(productsRef, { idField: 'id' }) as Observable<
      Product[]
    >;
  }
}
