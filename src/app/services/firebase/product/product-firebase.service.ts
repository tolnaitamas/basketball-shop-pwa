import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../shared/types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductFirebaseService {
  private productsSubject = new BehaviorSubject<Product[] | null>(null);
  products$ = this.productsSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadProducts(); // 🔁 Lekérés és cache-elés
  }

  private loadProducts(): void {
    const productsRef = collection(
      this.firestore,
      'product'
    ) as CollectionReference<Product>;
    collectionData<Product>(productsRef, { idField: 'id' }).subscribe(
      (products) => {
        this.productsSubject.next(products); // 🔁 cache update
      }
    );
  }

  getProductsSnapshot(): Product[] | null {
    return this.productsSubject.value; // 🔁 aktuális cache-elt érték
  }

  setProducts(products: Product[]): void {
    this.productsSubject.next(products); // 🔁 manuális frissítés ha kell
  }
}
