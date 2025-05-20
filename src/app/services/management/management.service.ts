import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/types/product';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private db!: IDBDatabase;
  private readonly objectStoreName = 'products';
  private dbReady: Promise<void>;

  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor() {
    this.dbReady = this.initDB();
  }

  // ----- Inicializálás -----
  private initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('products-db', 1);

      request.onerror = (event: any) => {
        console.error('Adatbázis hiba:', event.target.error);
        reject(event.target.error);
      };

      request.onupgradeneeded = (event: any) => {
        const db: IDBDatabase = event.target.result;
        const objectStore = db.createObjectStore(this.objectStoreName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        objectStore.createIndex('nameIndex', 'name', { unique: false });
      };

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        this.loadProducts(); // első betöltés
        resolve();
      };
    });
  }

  // ----- Termékek betöltése -----
  public async loadProducts(): Promise<Product[]> {
    await this.dbReady;

    return new Promise((resolve, reject) => {
      const products: Product[] = [];
      const transaction = this.db.transaction(this.objectStoreName, 'readonly');
      const objectStore = transaction.objectStore(this.objectStoreName);

      objectStore.openCursor().onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          products.push(cursor.value);
          cursor.continue();
        } else {
          this.productsSubject.next(products);
          resolve(products);
        }
      };

      objectStore.openCursor().onerror = (event: any) => {
        reject('Hiba a termékek betöltésekor: ' + event.target.error);
      };
    });
  }

  // ----- Termék hozzáadása vagy mennyiség növelése -----
  public async createProduct(product: Product): Promise<void> {
    await this.dbReady;

    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    const index = objectStore.index('nameIndex');
    const request = index.get(product.name);

    request.onsuccess = async (event: any) => {
      const existingProduct = event.target.result;

      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
        objectStore.put(existingProduct);
      } else {
        const newProduct = { ...product, quantity: 1 };
        objectStore.add(newProduct);
      }

      await this.loadProducts();
    };

    request.onerror = (event: any) => {
      console.error('Hiba a termék lekérdezésekor:', event.target.error);
    };
  }

  // ----- Termék mennyiségének frissítése -----
  public async updateProductQuantity(
    id: number,
    quantity: number
  ): Promise<void> {
    await this.dbReady;

    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    const request = objectStore.get(id);

    request.onsuccess = async (event: any) => {
      const product = event.target.result;
      if (product) {
        product.quantity = quantity;
        objectStore.put(product);
        await this.loadProducts();
      }
    };
  }

  // ----- Termék árának frissítése -----
  public async updateProductQuantityPrice(
    id: number,
    price: number
  ): Promise<void> {
    await this.dbReady;

    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    const request = objectStore.get(id);

    request.onsuccess = async (event: any) => {
      const product = event.target.result;
      if (product) {
        product.price = price;
        objectStore.put(product);
        await this.loadProducts();
      }
    };
  }

  // ----- Termék eltávolítása -----
  public async removeProduct(id: number): Promise<void> {
    await this.dbReady;

    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);

    objectStore.delete(id).onsuccess = async () => {
      await this.loadProducts();
    };
  }

  // ----- Kosár kiürítése -----
  public async clearCart(): Promise<void> {
    await this.dbReady;

    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);

    objectStore.clear().onsuccess = async () => {
      await this.loadProducts();
    };
  }

  // ----- Egy termék lekérdezése ID alapján -----
  public async getProduct(id: number): Promise<Product> {
    await this.dbReady;

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.objectStoreName, 'readonly');
      const objectStore = transaction.objectStore(this.objectStoreName);
      const request = objectStore.get(id);

      request.onsuccess = () => {
        const product = request.result;
        if (product) {
          resolve(product);
        } else {
          reject(new Error(`Termék nem található az ID alapján: ${id}`));
        }
      };

      request.onerror = (event: any) => {
        reject(event.target.error);
      };
    });
  }

  // ----- Termékek számának lekérdezése -----
  public getProductCount(): number {
    const products = this.productsSubject.getValue();
    return products.reduce((sum, p) => sum + (p.quantity || 0), 0);
  }
}
