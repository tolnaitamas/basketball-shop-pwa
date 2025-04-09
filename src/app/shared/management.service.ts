import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private db!: IDBDatabase;
  private readonly objectStoreName = 'products';

  public products: Product[] = [];

  constructor() {
    // Adatbázis létrehozása (ha még nem létezik) és megnyitása
    const request = indexedDB.open('product-db', 1);

    // Error kezelése az adatbázis létrehozásakor/megnyitásakor
    request.onerror = (event: any) => {
      console.log('Detabase error:', event.target.error);
    };

    // Ha a verziószám növekedett (vagy most hoztuk létre az adatbázist), itt kell frissíteni az object store sémát
    request.onupgradeneeded = (event: any) => {
      const db: IDBDatabase = event.target.result;

      // Object store létrehozása
      const objectStore = db.createObjectStore(this.objectStoreName, {
        keyPath: 'id',
        autoIncrement: true,
      });

      // Adatbázis index létrehozása a hatékonyabb működés érdekében
      objectStore.createIndex('nameIndex', 'name', { unique: false });
    };

    // Adatbázis sikeres létrehozásának&megnyitásának kezelése
    request.onsuccess = (event: any) => {
      this.db = event.target.result;
      this.loadProducts();
    };
  }

  public createBuilding(product: Product): void {
    // Object store tranzakció létrehozása és object store lekérése
    const objectStore = this.db
      .transaction(this.objectStoreName, 'readwrite')
      .objectStore(this.objectStoreName);
    const request = objectStore.add(product); // "add" request létrehozása

    // Sikeres request lekezelése
    request.onsuccess = (event: any) => {
      const newProduct: Product = {
        ...product,
        id: event.target.result, // A "result" a létrehozott épület ID-ja lesz
      };
      this.products.push(newProduct);
    };

    // Request error lekezelése
    request.onerror = (event: any) => {
      console.log('Error adding item:', event.target.error);
    };
  }

  private loadProducts(): void {
    // Object store tranzakció létrehozása és object store lekérése
    const objectStore = this.db
      .transaction(this.objectStoreName)
      .objectStore(this.objectStoreName);

    // Adatbázisban tárolt objektumok bejárása kurzor segítségével
    // Itt lehet opcionálisan további feltételeket definiálni (az SQL "WHERE"-hez hasonlóan)
    objectStore.openCursor().onsuccess = (event: any) => {
      const cursor = event.target.result;

      if (cursor) {
        this.products.push(cursor.value);

        cursor.continue(); // Következő elemre lépés
      }
    };
  }
}
