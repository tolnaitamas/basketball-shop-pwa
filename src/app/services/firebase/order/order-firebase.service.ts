import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Order } from '../../../shared/types/order';

@Injectable({
  providedIn: 'root',
})
export class OrderFirebaseService {
  constructor(private firestore: Firestore) {}

  async createOrder(order: Order): Promise<void> {
    try {
      const ordersRef = collection(this.firestore, 'orders');
      await addDoc(ordersRef, order);

      console.log('Rendelés sikeresen leadva.');
    } catch (error) {
      console.error('Hiba a rendelés leadása során:', error);
      throw error;
    }
  }
}
