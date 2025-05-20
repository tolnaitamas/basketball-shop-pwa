import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFirebaseService {
  constructor(private firestore: Firestore) {}

  getProductsCollection(): Observable<any[]> {
    const productsRef = collection(this.firestore, 'product');
    return collectionData(productsRef, { idField: 'id' }) as Observable<any[]>;
  }
}
